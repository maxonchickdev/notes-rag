import { ApiProperty } from '@nestjs/swagger';
import { IAddDocument } from '@notes-rag/shared';
import { IsNotEmpty } from 'class-validator';

/**
 *
 */
export class AddDocumentDto implements IAddDocument {
  @ApiProperty({
    description: 'The document',
    example: 'test document',
    name: 'document',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  document: string;
}
