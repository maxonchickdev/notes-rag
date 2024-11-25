import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  UseInterceptors,
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

import { User } from './decorator/user.decorator';
import { AddDocumentDto } from './dto/add-document.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetResponseUserDto } from './dto/get-user-response.dto';
import { PayloadDto } from './dto/payload.dto';
import { QueryDto } from './dto/query.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from './guard/jwt.guard';
import { SignInGuard } from './guard/sign-in.guard';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({
    description: 'Add document',
    type: AddDocumentDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    example: {
      error: 'Not Found',
      message: 'User not found',
      statusCode: HttpStatus.NOT_FOUND,
    },
  })
  @ApiOkResponse({
    description: 'User successfully updated',
    example: {
      createdAt: '2024-11-16T12:43:34.620Z',
      email: 'testEmail111111!@gmail.com',
      refresh: null,
      updatedAt: '2024-11-16T12:43:34.620Z',
      username: 'testUsername',
    },
  })
  @ApiOperation({ summary: 'Add document' })
  /**
   *
   * @param user
   * @param addDocumentDto
   */
  @Post('document')
  @UseGuards(JwtGuard)
  async addDocument(
    @User() user: PayloadDto,
    @Body() addDocumentDto: AddDocumentDto,
  ): Promise<GetResponseUserDto> {
    return await this.userService.addDocument(user._id, addDocumentDto);
  }

  @ApiBody({
    description: 'Create new user',
    type: CreateUserDto,
  })
  @ApiConflictResponse({
    description: 'User with the same email exists',
    example: {
      error: 'Conflict',
      message: 'User with the email exists',
      statusCode: HttpStatus.CONFLICT,
    },
  })
  @ApiOkResponse({
    description: 'User successfully created',
    example: {
      createdAt: '2024-11-16T12:37:15.061Z',
      email: 'testEmail@gmail.com',
      refresh: null,
      updatedAt: '2024-11-16T12:37:15.061Z',
      username: 'testUsername',
    },
  })
  @ApiOperation({ summary: 'Create new user' })
  @HttpCode(HttpStatus.OK)
  /**
   *
   * @param createUserDto
   */
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<GetResponseUserDto> {
    return await this.userService.createUser(createUserDto);
  }

  @ApiNotFoundResponse({
    description: 'User not found',
    example: {
      error: 'Not Found',
      message: 'User not found',
      statusCode: HttpStatus.NOT_FOUND,
    },
  })
  @ApiOkResponse({
    description: 'User deleted successfully',
    example: {
      createdAt: '2024-11-16T12:43:34.620Z',
      email: 'testEmail111111!@gmail.com',
      refresh: null,
      updatedAt: '2024-11-16T12:43:34.620Z',
      username: 'testUsername',
    },
  })
  @ApiOperation({ summary: 'Delete user' })
  /**
   *
   * @param userId
   */
  @Delete('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteUser(@Param('id') userId: string): Promise<GetResponseUserDto> {
    return await this.userService.deleteUser(userId);
  }

  @ApiNotFoundResponse({
    description: 'User not found',
    example: {
      error: 'Not Found',
      message: 'User not found',
      statusCode: HttpStatus.NOT_FOUND,
    },
  })
  @ApiOkResponse({
    description: 'All documents',
    example: ['document1', 'document2'],
    schema: {
      items: {
        type: 'string',
      },
      type: 'array',
    },
  })
  @ApiOperation({ summary: 'Get documents' })
  /**
   *
   * @param user
   */
  @Get('document')
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllDocuments(@User() user: PayloadDto): Promise<string[]> {
    return await this.userService.getDocuments(user._id);
  }

  @ApiBody({
    description: 'Get RAG response',
    type: QueryDto,
  })
  @ApiOperation({ summary: 'RAG prediction' })
  /**
   *
   * @param queryDto
   * @param user
   */
  @Post('prediction')
  @UseGuards(JwtGuard)
  async getRagPrediction(@Body() queryDto: QueryDto, @User() user: PayloadDto) {
    console.log(user._id);
    return this.userService.getRagResponse(queryDto, user._id);
  }

  @ApiNotFoundResponse({
    description: 'User not found',
    example: {
      error: 'Not Found',
      message: 'User not found',
      statusCode: HttpStatus.NOT_FOUND,
    },
  })
  @ApiOperation({ summary: 'Logout user' })
  /**
   *
   * @param user
   * @param res
   */
  @Get('logout')
  @UseGuards(JwtGuard)
  async logoutIn(
    @User() user: PayloadDto,
    @Res() res: Response,
  ): Promise<Response> {
    return res
      .clearCookie('access')
      .clearCookie('refresh')
      .send(await this.userService.logout(user._id));
  }

  @ApiBody({
    description: 'User sign-in',
    type: SignInUserDto,
  })
  @ApiConflictResponse({
    description: 'Email or password incorrected',
    example: {
      error: 'Conflict',
      message: 'Email or password incorrected',
      statusCode: HttpStatus.CONFLICT,
    },
  })
  @ApiOkResponse({
    description: 'User sign-in',
  })
  @ApiOperation({ summary: 'User sign-in' })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @UseGuards(SignInGuard)
  async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { access, refresh } = await this.userService.signIn(signInUserDto);
    return res
      .cookie('access', access, {
        httpOnly: true,
        path: '/',
      })
      .cookie('refresh', refresh, {
        httpOnly: true,
        path: '/',
      })
      .send(true);
  }

  @ApiBody({
    description: 'Update user',
    type: UpdateUserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    example: {
      error: 'Not Found',
      message: 'User not found',
      statusCode: HttpStatus.NOT_FOUND,
    },
  })
  @ApiOkResponse({
    description: 'User successfully updated',
    example: {
      createdAt: '2024-11-16T12:43:34.620Z',
      email: 'testEmail111111!@gmail.com',
      refresh: null,
      updatedAt: '2024-11-16T12:43:34.620Z',
      username: 'testUsername',
    },
  })
  @ApiOperation({ summary: 'Update existing user' })
  /**
   *
   * @param userId
   * @param updateUserDto
   */
  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GetResponseUserDto> {
    return await this.userService.updateUser(userId, updateUserDto);
  }
}
