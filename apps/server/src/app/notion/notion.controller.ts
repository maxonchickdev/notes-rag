import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetUser } from '../../common/decorators/get-user-from-request.decorator';
import { AuthGuard } from '../../common/guards/firebase-auth.guard';
import { User } from '../../common/schemas/user.schema';
import { DocumentDto } from './dto/document.dto';
import { NotionService } from './notion.service';

@ApiTags('notion')
@Controller('notion')
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Get('documents')
  @UseGuards(AuthGuard)
  async getDocs(@GetUser() user: User): Promise<DocumentDto[]> {
    return await this.notionService.getDocuments(user.uId);
  }

  @Get(':apiToken')
  @UseGuards(AuthGuard)
  async notionTokenHealthCheck(
    @Param('apiToken') apiToken: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return await this.notionService.tokenHealthCheck(user.uId, apiToken);
  }

  @Get(':pageId')
  @UseGuards(AuthGuard)
  async convert(
    @Param('pageId') pageId: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return await this.notionService.convertNotionToMarkdown(user.uId, pageId);
  }
}
