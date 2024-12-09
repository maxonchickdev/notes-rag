import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetUser } from '../../common/decorators/get-user-from-request.decorator';
import { AuthGuard } from '../../common/guards/firebase-auth.guard';
import { User } from '../../common/schemas/user.schema';
import { QueryDto } from './dto/query.dto';
import { RagService } from './rag.service';

@ApiTags('rag')
@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @UseGuards(AuthGuard)
  async generateRagResponse(@Body() queryDto: QueryDto, @GetUser() user: User) {
    return await this.ragService.generateResponse(user.uId, queryDto.query);
  }
}
