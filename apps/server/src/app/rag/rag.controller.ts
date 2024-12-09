import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  // UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// import { AuthGuard } from '../../common/guards/firebase-auth.guard';
import { QueryDto } from './dto/query.dto';
import { RagService } from './rag.service';

@ApiTags('rag')
@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  // @UseGuards(AuthGuard)
  async generateRagResponse(@Body() queryDto: QueryDto) {
    return await this.ragService.generateResponse(
      'PXgi96BgihXYjiEfqXHxnPge1Gt1',
      queryDto.query,
    );
  }
}
