import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUser } from '../interface/user.interface';

@Injectable()
export class UserService {

  /**
   *
   * @param userModel
   */
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  /**
   * @param createUserDto
   */
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const existingUser = await this.getUserByEmail(createUserDto.email);
    if (existingUser)
      throw new ConflictException('User with the same email exists');
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  /**
   * @param userId
   */
  async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) throw new NotFoundException('User not found');
    return deletedUser;
  }

  /**
   *
   */
  async getAllUsers(): Promise<IUser[]> {
    const userData = await this.userModel.find();
    if (!userData || userData.length === 0)
      throw new NotFoundException('Users data not found!');
    return userData;
  }

  /**
   * @param email
   */
  async getUserByEmail(email: string): Promise<IUser> {
    const existingUser = await this.userModel.findOne({ email }).exec();
    return existingUser;
  }

  /**
   *
   * @param userId
   */
  async getUserById(userId: string): Promise<IUser> {
    const existingUser = await this.userModel.findById(userId).exec();
    if (!existingUser) throw new NotFoundException('User not found');
    return existingUser;
  }

  /**
   * @param userId
   * @param updateUserDto
   */
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto
  ): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      {
        new: true,
      }
    );
    if (!existingUser) throw new NotFoundException('User not found');
    return existingUser;
  }
}
