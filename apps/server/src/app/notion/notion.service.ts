import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

import { NOTION_CONFIG } from '../../common/config/notion.config';
import { UsersService } from '../users/users.service';
import { ApiTokenDto } from './dto/api-token.dto';
import { DocumentDto } from './dto/document.dto';

@Injectable()
export class NotionService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
  ) {}

  async convertNotionToMarkdown(
    uId: string,
    parentPageId: string,
  ): Promise<boolean> {
    const notionApiToken = await this.usersService.getNotionApiToken(uId);

    const notion: Client = new Client({
      auth: notionApiToken,
    });

    const n2m: NotionToMarkdown = new NotionToMarkdown({
      notionClient: notion,
    });

    const parentMarkdown = await n2m.pageToMarkdown(parentPageId, 2);
    const childPages = parentMarkdown.filter(
      (block) => block.type === 'child_page',
    );

    for (const child of childPages) {
      const childPageId = child.blockId;
      const childMarkdown = await n2m.pageToMarkdown(childPageId, 2);
      const parentContent =
        childMarkdown.find((block) => block.parent)?.parent || '';

      const documentDto: DocumentDto = {
        document: parentContent,
      };

      await this.usersService.addDocuments(documentDto);
    }

    return true;
  }

  async getDocuments(uId: string): Promise<DocumentDto[]> {
    const user = await this.usersService.getUserByUId(uId);

    return user ? user.documents : [];
  }

  async tokenHealthCheck(
    uId: string,
    apiTokenDto: ApiTokenDto,
  ): Promise<boolean> {
    try {
      await this.httpService.axiosRef({
        baseURL: this.configService.get<string>(`${NOTION_CONFIG}.healthCheck`),
        headers: {
          Authorization: `Bearer ${apiTokenDto.token}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        method: 'get',
      });

      await this.usersService.setNotionApiToken(uId, apiTokenDto.token);

      return true;
    } catch (err) {
      throw new ConflictException('Token not valid');
    }
  }
}
