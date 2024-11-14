import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  /**
   *
   * @param userService
   */
  constructor(private readonly userService: UserService) {}


  /**
   *
   * @param res
   * @param createUserDto
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    description: 'Create new user',
    type: CreateUserDto,
  })
  @ApiOperation({ summary: 'Create new user' })
  @ApiOkResponse({
    description: 'User successfully created',
    example: {
      message: 'User successfully created',
      newUser: {
        _id: '6734778162e0ac7fa3f91111',
        email: 'testEmail@gmail.com',
        password: 'testPassword',
        username: 'testUsername',
      },
    },
  })
  @ApiConflictResponse({
    description: 'User with the same email exists',
    example: {
      message: 'User with the email exists',
    },
  })
  async createUser(
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto
  ): Promise<Response> {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return res.status(HttpStatus.OK).json({
        message: 'User successfully created',
        newUser,
      });
    } catch (err) {
      return res.status(err.response.statusCode).json(err.response.message);
    }
  }

  /**
   *
   * @param response
   * @param userId
   */
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({
    description: 'User deleted successfully',
    example: {
      deletedUser: {
        _id: '6734778162e0ac7fa3f91111',
        email: 'testEmail@gmail.com',
        password: 'testPassword',
        username: 'testUsername',
      },
      message: 'User deleted successfully',
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    example: {
      message: 'User not found',
    },
  })
  async deleteStudent(
    @Res() response: Response,
    @Param('id') userId: string
  ): Promise<Response> {
    try {
      const deletedUser = await this.userService.deleteUser(userId);
      return response.status(HttpStatus.OK).json({
        deletedUser,
        message: 'User deleted successfully',
      });
    } catch (err) {
      return response
        .status(err.response.statusCode)
        .json(err.response.message);
    }
  }

  /**
   *
   * @param res
   * @param userId
   */
  @Get('/:id')
  @ApiOperation({ summary: 'Find user' })
  @ApiOkResponse({
    description: 'User successfully found',
    example: {
      existingUser: {
        _id: '6734778162e0ac7fa3f91111',
        email: 'testEmail@gmail.com',
        password: 'testPassword',
        username: 'testUsername',
      },
      message: 'User found successfully',
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    example: {
      message: 'User not found',
    },
  })
  async getUser(
    @Res() res: Response,
    @Param('id') userId: string
  ): Promise<Response> {
    try {
      const existingUser = await this.userService.getUserById(userId);
      return res.status(HttpStatus.OK).json({
        existingUser,
        message: 'User found successfully',
      });
    } catch (err) {
      return res.status(err.response.statusCode).json(err.response.message);
    }
  }

  /**
   *
   * @param res
   * @param userId
   * @param updateUserDto
   */
  @Put('/:id')
  @ApiBody({
    description: 'Update user',
    type: UpdateUserDto,
  })
  @ApiOperation({ summary: 'Update existing user' })
  @ApiOkResponse({
    description: 'User successfully updated',
    example: {
      existingUser: {
        _id: '6734778162e0ac7fa3f91111',
        email: 'testEmail@gmail.com',
        password: 'testPassword',
        username: 'testUsername',
      },
      message: 'User successfully updated',
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    example: {
      message: 'User not found',
    },
  })
  async updateUser(
    @Res() res: Response,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<Response> {
    try {
      const existingUser = await this.userService.updateUser(
        userId,
        updateUserDto
      );
      return res.status(HttpStatus.OK).json({
        existingUser,
        message: 'User has been successfully updated',
      });
    } catch (err) {
      return res.status(err.response.statusCode).json(err.response.message);
    }
  }
}
