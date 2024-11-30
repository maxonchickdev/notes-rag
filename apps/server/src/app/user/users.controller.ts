import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../../common/guards/firebase-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBody({
    description: 'Create new user',
    type: CreateUserDto,
  })
  @ApiOperation({ summary: 'User sign up' })
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return await this.userService.createUser(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'User sign in' })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @UseGuards(AuthGuard)
  async signIn(): Promise<boolean> {
    return true;
  }
}
