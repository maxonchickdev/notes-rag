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
import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  ApiBody,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Description placeholder
   *
   * @async
   * @param {Response} res
   * @param {CreateUserDto} createUserDto
   * @returns {Promise<Response>}
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: CreateUserDto,
    description: 'Create new user',
  })
  @ApiOperation({ summary: 'Create new user' })
  @ApiOkResponse({
    description: 'User successfully created',
    type: CreateUserDto,
  })
  @ApiConflictResponse({
    description: 'User with the same username or email exists',
    // type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.CONFLICT,
      message: 'User with the same username or email exists',
    },
  })
  async createUser(
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto
  ): Promise<Response> {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'User successfully created',
        newUser,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Student not created',
        error: 'Bad Request',
      });
    }
  }

  /**
   * Description placeholder
   *
   * @async
   * @param {Response} res
   * @param {string} userId
   * @param {UpdateUserDto} updateUserDto
   * @returns {Promise<Response>}
   */
  @Put('/:id')
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
        message: 'User has been successfully updated',
        existingUser,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  /**
   * Description placeholder
   *
   * @async
   * @param {Response} res
   * @param {string} userId
   * @returns {Promise<Response>}
   */
  @Get('/:id')
  async getUser(
    @Res() res: Response,
    @Param('id') userId: string
  ): Promise<Response> {
    try {
      const existingStudent = await this.userService.getUser(userId);
      return res.status(HttpStatus.OK).json({
        message: 'Student found successfully',
        existingStudent,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  /**
   * Description placeholder
   *
   * @async
   * @param {Response} response
   * @param {string} userId
   * @returns {Promise<Response>}
   */
  @Delete('/:id')
  async deleteStudent(
    @Res() response: Response,
    @Param('id') userId: string
  ): Promise<Response> {
    try {
      const deletedUser = await this.userService.deleteUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
