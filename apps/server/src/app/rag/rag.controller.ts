import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetUser } from '../../common/decorators/get-user-from-request.decorator';
import { AuthGuard } from '../../common/guards/firebase-auth.guard';
import { User } from '../../common/schemas/user.schema';
import { RagHistoryDto } from './dto/rag-history.dto';
import { RagService } from './rag.service';

@ApiTags('rag')
@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @Get('history')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getRagHistory(@GetUser() user: User): Promise<RagHistoryDto[]> {
    return await this.ragService.getHistory(user.uId);
  }

  @Get(':query')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async generateRagResponse(
    @GetUser() user: User,
    @Param('query') query: string,
  ): Promise<boolean> {
    return await this.ragService.generateResponse(user.uId, query);
  }
}
