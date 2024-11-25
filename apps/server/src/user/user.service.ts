import { HttpService } from '@nestjs/axios';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model, Types } from 'mongoose';

import { HASH_CONFIG } from '../config/hash.config';
import { JWT_REFRESH_CONFIG } from '../config/jwt-refresh.config';
import { AddDocumentDto } from './dto/add-document.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetResponseUserDto } from './dto/get-user-response.dto';
import { QueryDto } from './dto/query.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async addDocument(
    id: Types.ObjectId,
    addDocumentDto: AddDocumentDto,
  ): Promise<GetResponseUserDto> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $push: { documents: addDocumentDto.document } },
      { new: true },
    );

    if (!updatedUser) throw new NotFoundException('User not found');

    return updatedUser;
  }

  async createUser(createUserDto: CreateUserDto): Promise<GetResponseUserDto> {
    const { email, password, username } = createUserDto;

    const existingUser = await this.getUserByEmail(createUserDto.email);

    if (existingUser)
      throw new ConflictException('User with the same email exists');

    const hashedPassword = await hash(
      password,
      parseInt(this.configService.get<string>(`${HASH_CONFIG}.saltOrRounds`)),
    );

    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      username,
    });

    const savedUser = await newUser.save();

    return new GetResponseUserDto(savedUser.toObject());
  }

  async deleteUser(id: string): Promise<GetResponseUserDto> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) throw new NotFoundException('User not found');
    return new GetResponseUserDto(deletedUser.toObject());
  }

  async getDocuments(id: Types.ObjectId): Promise<string[]> {
    const existingUser = await this.userModel
      .findById(id)
      .select('documents')
      .exec();

    if (!existingUser) throw new NotFoundException('User not found');

    return existingUser.documents;
  }

  async getRagResponse(queryDto: QueryDto, id: Types.ObjectId) {
    const documents = await this.getDocuments(id);
    const res = await this.httpService.axiosRef<string>({
      baseURL: 'https://e466-34-23-168-93.ngrok-free.app',
      data: {
        documents: documents,
        query: queryDto.query,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: '/predict',
    });
    return res.data;
  }

  async getUserByEmail(email: string): Promise<GetResponseUserDto> {
    const existingUser = await this.userModel.findOne({ email }).exec();
    return existingUser;
  }

  async getUserById(id: Types.ObjectId): Promise<GetResponseUserDto> {
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) throw new NotFoundException('User not found');
    return new GetResponseUserDto(existingUser.toObject());
  }

  async logout(id: Types.ObjectId): Promise<GetResponseUserDto> {
    const existingUser = await this.getUserById(id);

    await this.updateUser(id.toString(), { refresh: null });

    return new GetResponseUserDto(existingUser);
  }

  async signIn(
    signInUserDto: SignInUserDto,
  ): Promise<{ access: string; refresh: string }> {
    const existingUser = await this.getUserByEmail(signInUserDto.email);

    const payload = {
      _id: existingUser._id.toString(),
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>(
        `${JWT_REFRESH_CONFIG}.refresh.expiresIn`,
      ),
      secret: this.configService.get<string>('refresh.secret'),
    });

    const hashedRefreshToken = await hash(
      refreshToken,
      parseInt(this.configService.get<string>(`${HASH_CONFIG}.saltOrRounds`)),
    );

    await this.updateUser(existingUser._id.toString(), {
      refresh: hashedRefreshToken,
    });

    return { access: accessToken, refresh: refreshToken };
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<GetResponseUserDto> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      {
        new: true,
      },
    );
    if (!existingUser) throw new NotFoundException('User not found');
    return new GetResponseUserDto(existingUser.toObject());
  }
}
