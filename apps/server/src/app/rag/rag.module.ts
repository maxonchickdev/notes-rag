import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HTTP_CONFIG } from '../../common/config/http.config';
import { AuthGuard } from '../../common/guards/firebase-auth.guard';
import { FirebaseModule } from '../firebase/firebase.module';
import { NotionModule } from '../notion/notion.module';
import { UsersModule } from '../users/users.module';
import { RagController } from './rag.controller';
import { RagService } from './rag.service';

@Module({
  controllers: [RagController],
  imports: [
    FirebaseModule,
    NotionModule,
    UsersModule,
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        maxRedirects: configService.get<number>(`${HTTP_CONFIG}.maxRedirects`),
        timeout: configService.get<number>(`${HTTP_CONFIG}.timeout`),
      }),
    }),
  ],
  providers: [RagService, AuthGuard],
})
export class RagModule {}
