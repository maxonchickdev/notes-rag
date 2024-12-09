import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HUGGING_FACE_CONFIG } from '../../common/config/hugging-face.config';
import { NotionService } from '../notion/notion.service';

@Injectable()
export class RagService {
  constructor(
    private readonly notionService: NotionService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async generateResponse(uId: string, query: string): Promise<string> {
    try {
      const documents = (await this.notionService.getDocuments(uId)).map(
        (doc) => doc.document,
      );

      const requestData = {
        inputs: {
          sentences: documents,
          source_sentence: query,
        },
      };

      const response = await this.httpService.axiosRef({
        data: requestData,
        headers: {
          Authorization: `Bearer ${this.configService.get<string>(`${HUGGING_FACE_CONFIG}.apiKey`)}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: this.configService.get<string>(
          `${HUGGING_FACE_CONFIG}.embeddingsModel`,
        ),
      });

      return response.data;
    } catch (error) {
      throw new BadRequestException('Failed to generate response');
    }
  }
}
