import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../../common/schemas/user.schema';
import { DocumentDto } from '../notion/dto/document.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async addDocuments(documentsDto: DocumentDto): Promise<boolean> {
    const result = await this.userModel.updateOne(
      { uId: 'PXgi96BgihXYjiEfqXHxnPge1Gt1' },
      {
        $addToSet: {
          documents: documentsDto,
        },
      },
    );

    return result.modifiedCount > 0;
  }

  async createUser(createUserDto: CreateUserDto): Promise<boolean> {
    const user = await this.getUserByUId(createUserDto.uId);

    if (user)
      throw new ConflictException(
        `User with uId ${createUserDto.uId} already exists`,
      );

    const newUser = new this.userModel({
      uId: createUserDto.uId,
    });

    await newUser.save();

    return true;
  }

  async getNotionApiToken(uId: string): Promise<string> {
    const user = await this.getUserByUId(uId);

    if (!user) throw new NotFoundException(`User with uId ${uId} not found`);

    return user.notionApiToken;
  }

  async getUserByUId(uId: string): Promise<User> {
    return await this.userModel.findOne({ uId }).exec();
  }

  async setNotionApiToken(uId: string, token: string): Promise<boolean> {
    const result = await this.userModel.updateOne(
      { uId },
      { $set: { notionApiToken: token } },
    );

    if (result.modifiedCount === 0) {
      throw new NotFoundException(`User with uId ${uId} not found`);
    }

    return true;
  }
}
