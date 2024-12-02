import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../../common/guards/firebase-auth.guard';
import { SignOutGuard } from '../../common/guards/sign-out.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'User sign in' })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @UseGuards(AuthGuard)
  async signIn(): Promise<void> {}

  @ApiOperation({ summary: 'User sign out' })
  @Get('sign-out')
  @HttpCode(HttpStatus.OK)
  @UseGuards(SignOutGuard)
  async signOut(): Promise<void> {}

  @ApiBody({
    description: 'Create new user',
    type: CreateUserDto,
  })
  @ApiOperation({ summary: 'User sign up' })
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  @UseInterceptors(ClassSerializerInterceptor)
  async signUp(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return await this.usersService.createUser(createUserDto);
  }
}
