import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HTTP_CONFIG } from '../../common/config/http.config';
import { NotionModule } from '../notion/notion.module';
import { RagController } from './rag.controller';
import { RagService } from './rag.service';

@Module({
  controllers: [RagController],
  imports: [
    NotionModule,
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        maxRedirects: configService.get<number>(`${HTTP_CONFIG}.maxRedirects`),
        timeout: configService.get<number>(`${HTTP_CONFIG}.timeout`),
      }),
    }),
  ],
  providers: [RagService],
})
export class RagModule {}
