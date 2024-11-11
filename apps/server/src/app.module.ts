import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONFIG } from './config/database.config';
import databaseConfig from './config/database.config';
import serverConfig from './config/server.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [databaseConfig, serverConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>(`${DATABASE_CONFIG}.users.uri`),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
