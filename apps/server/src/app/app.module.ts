import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DATABASE_CONFIG } from '../common/config/database.config';
import databaseConfig from '../common/config/database.config';
import firebaseConfig from '../common/config/firebase.config';
import huggingFaceConfig from '../common/config/hugging-face.config';
import notionConfig from '../common/config/notion.config';
import serverConfig from '../common/config/server.config';
import { FirebaseModule } from './firebase/firebase.module';
import { NotionModule } from './notion/notion.module';
import { RagModule } from './rag/rag.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [
        databaseConfig,
        serverConfig,
        firebaseConfig,
        notionConfig,
        huggingFaceConfig,
      ],
    }),
    FirebaseModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>(`${DATABASE_CONFIG}.users.uri`),
        };
      },
    }),
    UsersModule,
    NotionModule,
    RagModule,
  ],
})
export class AppModule {}
