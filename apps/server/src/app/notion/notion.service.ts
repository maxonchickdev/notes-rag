import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

import { NOTION_CONFIG } from '../../common/config/notion.config';
import { UsersService } from '../users/users.service';
import { DocumentDto } from './dto/document.dto';

@Injectable()
export class NotionService {
  private readonly logger = new Logger(NotionService.name);

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

  async tokenHealthCheck(uId: string, apiToken: string): Promise<boolean> {
    try {
      await this.httpService.axiosRef({
        baseURL: this.configService.get<string>(`${NOTION_CONFIG}.healthCheck`),
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        method: 'GET',
      });

      await this.usersService.setNotionApiToken(uId, apiToken);

      return true;
    } catch (err) {
      this.logger.error(`An error occured ${err}`);
      throw new BadRequestException('Token not valid');
    }
  }
}
