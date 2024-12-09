import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetUser } from '../../common/decorators/get-user-from-request.decorator';
import { AuthGuard } from '../../common/guards/firebase-auth.guard';
import { User } from '../../common/schemas/user.schema';
import { ApiTokenDto } from './dto/api-token.dto';
import { DocumentDto } from './dto/document.dto';
import { NotionService } from './notion.service';

@ApiTags('notion')
@Controller('notion')
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Get('documents')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getDocs(@GetUser() user: User): Promise<DocumentDto[]> {
    return await this.notionService.getDocuments(user.uId);
  }

  @Get(':pageId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async convert(
    @Param('pageId') pageId: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return await this.notionService.convertNotionToMarkdown(user.uId, pageId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('token-health-check')
  @UseGuards(AuthGuard)
  async notionTokenHealthCheck(
    @Body() apiTokenDto: ApiTokenDto,
    @GetUser() user: User,
  ): Promise<boolean> {
    return await this.notionService.tokenHealthCheck(user.uId, apiTokenDto);
  }
}
