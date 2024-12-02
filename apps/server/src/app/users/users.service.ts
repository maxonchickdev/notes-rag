import { ConflictException, Injectable } from '@nestjs/common';
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

  async getUserByUId(uId: string): Promise<User> {
    return await this.userModel.findOne({ uId }).exec();
  }
}
