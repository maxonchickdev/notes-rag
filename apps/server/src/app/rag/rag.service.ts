import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HUGGING_FACE_CONFIG } from '../../common/config/hugging-face.config';
import { NotionService } from '../notion/notion.service';
import { UsersService } from '../users/users.service';
import { ChatRequestDataDto } from './dto/chat-request-data.dto';
import { ChatResponseDataDto } from './dto/chat-response-data.dto';
import { RagHistoryDto } from './dto/rag-history.dto';

@Injectable()
export class RagService {
  private readonly logger = new Logger(RagService.name);

  constructor(
    private readonly notionService: NotionService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly userService: UsersService,
  ) {}

  private createInputText(context: string, query: string): string {
    return `Answer the question based on your knowledge. Use the following context to help:\n\n${context}\n\n${query}`;
  }

  private getTopIndex(similarities: number[]): number {
    return similarities.indexOf(Math.max(...similarities));
  }

  private async fetchAndPerformDocuments(uId: string): Promise<string[]> {
    const documents = (await this.notionService.getDocuments(uId)).map(
      (doc) => doc.document,
    );
    return documents;
  }

  private createRequestData(
    documents: string[],
    query: string,
  ): ChatRequestDataDto {
    return {
      inputs: {
        sentences: documents,
        source_sentence: query,
      },
    };
  }

  private async fetchSimilarities(
    requestDataDto: ChatRequestDataDto,
  ): Promise<number[]> {
    try {
      const response = await this.httpService.axiosRef({
        data: requestDataDto,
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
    } catch (err) {
      this.logger.error(`An error occured ${err}`);
      throw new BadRequestException('Cannot get similarities');
    }
  }

  private async fetchAnswer(inputText: string): Promise<ChatResponseDataDto> {
    try {
      const completionResponse = await this.httpService.axiosRef({
        data: { inputs: inputText, max_tokens: 500 },
        headers: {
          Authorization: `Bearer ${this.configService.get<string>(`${HUGGING_FACE_CONFIG}.apiKey`)}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: this.configService.get<string>(`${HUGGING_FACE_CONFIG}.chatModel`),
      });
      return completionResponse.data;
    } catch (err) {
      this.logger.error(`An error occured ${err}`);
      throw new BadRequestException('Cannot generate answer');
    }
  }

  private extractAnswer(answer: ChatResponseDataDto) {
    return answer[0]['generated_text'].trim().split('\n').pop();
  }

  async generateResponse(uId: string, query: string): Promise<boolean> {
    try {
      const documents = await this.fetchAndPerformDocuments(uId);

      const requestData = this.createRequestData(documents, query);

      const similarities = await this.fetchSimilarities(requestData);

      const topIndex = this.getTopIndex(similarities);

      const context = documents[topIndex];

      const inputText = this.createInputText(context, query);

      const templateAnswer = await this.fetchAnswer(inputText);

      console.log(templateAnswer);

      const answer = this.extractAnswer(templateAnswer);

      await this.userService.addToRagHistory(uId, {
        query: query,
        response: answer,
      });

      return true;
    } catch (err) {
      this.logger.error(`An error occured ${err}`);
      throw new BadRequestException('Cannot generate response');
    }
  }

  async getHistory(uId: string): Promise<RagHistoryDto[]> {
    const user = await this.userService.getUserByUId(uId);

    return user ? user.ragHistory : [];
  }
}
