import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DATABASE_CONFIG } from './config/database.config';
import databaseConfig from './config/database.config';
import hashConfig from './config/hash.config';
import jwtAccessConfig from './config/jwt-access.config';
import jwtRefreshConfig from './config/jwt-refresh.config';
import serverConfig from './config/server.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [
        databaseConfig,
        serverConfig,
        hashConfig,
        jwtAccessConfig,
        jwtRefreshConfig,
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>(`${DATABASE_CONFIG}.users.uri`),
        };
      },
    }),
    UserModule,
  ],
})
export class AppModule {}
