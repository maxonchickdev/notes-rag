import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HTTP_CONFIG } from '../../common/config/http.config';
import { FirebaseModule } from '../firebase/firebase.module';
import { UsersModule } from '../users/users.module';
import { NotionController } from './notion.controller';
import { NotionService } from './notion.service';

@Module({
  controllers: [NotionController],
  imports: [
    FirebaseModule,
    UsersModule,
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        maxRedirects: configService.get<number>(`${HTTP_CONFIG}.maxRedirects`),
        timeout: configService.get<number>(`${HTTP_CONFIG}.timeout`),
      }),
    }),
  ],
  providers: [NotionService],
})
export class NotionModule {}
