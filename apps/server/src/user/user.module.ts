import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { JWT_ACCESS_CONFIG } from '../config/jwt-access.config';
import { User, UserSchema } from './schema/user.schema';
import { JwtStrategy } from './strategy/jwt-strategy';
import { SignInStrategy } from './strategy/sign-in.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
	controllers: [UserController],
	exports: [UserService],
	imports: [
		HttpModule,
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			/**
			 *
			 * @param configService
			 */
			useFactory: async(configService: ConfigService) => {
				return {
					secret: configService.get<string>(`${JWT_ACCESS_CONFIG}.access.secret`),
					signOptions: {
						expiresIn: configService.get<string>(`${JWT_ACCESS_CONFIG}.access.expiresIn`)
					}
				};
			}
		})
	],
	providers: [UserService, SignInStrategy, JwtStrategy]
})
export class UserModule {}
