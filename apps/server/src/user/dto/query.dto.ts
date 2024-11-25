import { ApiProperty } from '@nestjs/swagger';
import { IQuery } from '@notes-rag/shared';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 *
 */
export class QueryDto implements IQuery {
  documents: string[];

  @ApiProperty({
    description: 'The query',
    example: 'This is test query',
    name: 'query',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  query: string;
}
