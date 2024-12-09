import { ApiProperty } from '@nestjs/swagger';
import { IQuery } from '@notes-rag/shared';
import { IsNotEmpty, IsString } from 'class-validator';

export class QueryDto implements IQuery {
  @ApiProperty({
    description: 'Query',
    example: 'What is porsche 911 Turbo S?',
    name: 'query',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  query: string;
}
