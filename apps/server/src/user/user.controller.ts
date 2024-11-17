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
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from './guard/jwt.guard';
import { SignInGuard } from './guard/sign-in.guard';
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
	 * @param user
	 * @param addDocumentDto
	 */
	@Post('document')
	@ApiBody({
  	description: 'Add document',
  	type: AddDocumentDto,
  })
  @ApiOperation({ summary: 'Add document' })
	@ApiOkResponse({
  	description: 'User successfully updated',
  	example: {
			createdAt: '2024-11-16T12:43:34.620Z',
			email: 'testEmail111111!@gmail.com',
			refresh: null,
			updatedAt: '2024-11-16T12:43:34.620Z',
			username: 'testUsername'
		},
  })
	@ApiNotFoundResponse({
  	description: 'User not found',
  	example: {
  		error: 'Not Found',
			message: 'User not found',
			statusCode: HttpStatus.NOT_FOUND
  	},
  })
	@UseGuards(JwtGuard)
	async addDocument(@User() user: PayloadDto, @Body() addDocumentDto: AddDocumentDto): Promise<GetResponseUserDto> {
		console.log(user);
		return await this.userService.addDocument(user._id, addDocumentDto);
	}

	/**
	 *
	 * @param user
	 */
	@Get('document')
  @ApiOperation({ summary: 'Get documents' })
	@ApiNotFoundResponse({
  	description: 'User not found',
  	example: {
  		error: 'Not Found',
			message: 'User not found',
			statusCode: HttpStatus.NOT_FOUND
  	},
  })
	@ApiOkResponse({
    description: 'All documents',
    example: ['document1', 'document2'],
    schema: {
      items: {
        type: 'string'
      },
      type: 'array',
    },
  })
	@UseGuards(JwtGuard)
	@UseInterceptors(ClassSerializerInterceptor)
	async getAllDocuments(@User() user: PayloadDto): Promise<string[]> {
		console.log('User', user);
		return await this.userService.getDocuments(user._id);
	}

	/**
	 *
	 * @param user
	 * @param res
	 */
	@Get('logout')
  @ApiOperation({ summary: 'Logout user' })
	@ApiNotFoundResponse({
  	description: 'User not found',
  	example: {
			error: 'Not Found',
			message: 'User not found',
			statusCode: HttpStatus.NOT_FOUND
  	},
  })
	@UseGuards(JwtGuard)
	async logoutIn(@User() user: PayloadDto, @Res() res: Response): Promise<Response> {
		return res.clearCookie('access').clearCookie('refresh').send(await this.userService.logout(user._id));
	}

  /**
   *
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
			createdAt: '2024-11-16T12:37:15.061Z',
			email: 'testEmail@gmail.com',
  		refresh: null,
  		updatedAt: '2024-11-16T12:37:15.061Z',
  		username: 'testUsername',
  	},
  })
  @ApiConflictResponse({
  	description: 'User with the same email exists',
  	example: {
  		error: 'Conflict',
  		message: 'User with the email exists',
  		statusCode: HttpStatus.CONFLICT
  	},
  })
	@UseInterceptors(ClassSerializerInterceptor)
	async createUser(
    @Body() createUserDto: CreateUserDto
	): Promise<GetResponseUserDto> {
		return await this.userService.createUser(createUserDto);
	}

  /**
   *
   * @param userId
   */
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({
  	description: 'User deleted successfully',
  	example: {
			createdAt: '2024-11-16T12:43:34.620Z',
			email: 'testEmail111111!@gmail.com',
			refresh: null,
			updatedAt: '2024-11-16T12:43:34.620Z',
			username: 'testUsername'
		}
  })
  @ApiNotFoundResponse({
  	description: 'User not found',
  	example: {
			error: 'Not Found',
			message: 'User not found',
			statusCode: HttpStatus.NOT_FOUND
  	},
  })
	@UseInterceptors(ClassSerializerInterceptor)
  async deleteUser(
    @Param('id') userId: string
  ): Promise<GetResponseUserDto> {
  	return await this.userService.deleteUser(userId);
  }

	/**
	 *
	 * @param signInUserDto
	 * @param res
	 */
	@Post('sign-in')
	@UseGuards(SignInGuard)
	@HttpCode(HttpStatus.OK)
	@ApiBody({
  	description: 'User sign-in',
  	type: SignInUserDto,
  })
	@ApiOperation({ summary: 'User sign-in' })
	@ApiOkResponse({
  	description: 'User sign-in',
  })
	@ApiConflictResponse({
  	description: 'Email or password incorrected',
  	example: {
  		error: 'Conflict',
  		message: 'Email or password incorrected',
  		statusCode: HttpStatus.CONFLICT
  	},
  })
  async signIn(@Body() signInUserDto: SignInUserDto, @Res() res: Response): Promise<Response> {
		const { access, refresh } = await this.userService.signIn(signInUserDto);
		return res.cookie('access', access, {
			httpOnly: true,
			path: '/'
		}).cookie('refresh', refresh, {
			httpOnly: true,
			path: '/'
		}).send(true);
	}

	/**
	 *
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
			createdAt: '2024-11-16T12:43:34.620Z',
			email: 'testEmail111111!@gmail.com',
			refresh: null,
			updatedAt: '2024-11-16T12:43:34.620Z',
			username: 'testUsername'
		},
  })
  @ApiNotFoundResponse({
  	description: 'User not found',
  	example: {
  		error: 'Not Found',
			message: 'User not found',
			statusCode: HttpStatus.NOT_FOUND
  	},
  })
	@UseInterceptors(ClassSerializerInterceptor)
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<GetResponseUserDto> {
  	return await this.userService.updateUser(
  		userId,
  		updateUserDto
  	);
	}
}
