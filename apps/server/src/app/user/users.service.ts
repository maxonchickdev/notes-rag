import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../../common/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<boolean> {
    const user = await this.getUserByUId(createUserDto.uId);

    if (user) throw new ConflictException('User already exists');

    const newUser = new this.userModel({
      uid: createUserDto.uId,
    });

    await newUser.save();

    return true;
  }

  async getUserByUId(uId: string): Promise<User> {
    const existingUser = await this.userModel.findById(uId).exec();
    if (!existingUser) throw new NotFoundException('User not found');
    return existingUser;
  }
}
