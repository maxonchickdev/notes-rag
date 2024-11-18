import { ConflictException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { compare } from 'bcrypt';
import { Strategy } from 'passport-local';

import { UserService } from '../user.service';

@Injectable()
export class SignInStrategy extends PassportStrategy(Strategy) {
	/**
	 *
	 * @param userService
	 */
	constructor(private readonly userService: UserService) {
		super({
			passwordField: 'password',
			usernameField: 'email'
		});
	}

	/**
	 *
	 * @param email
	 * @param password
	 */
	async validate(email: string, password: string): Promise<boolean> {
		const existingUser = await this.userService.getUserByEmail(email);
		const isPasswordsSame = await compare(password, existingUser.password);

		if(!isPasswordsSame) throw new ConflictException('Email or password incorrected');

		return true;
	}
}
