import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DocumentDto {
  @ApiProperty({
    description: 'Document',
    example: 'This is test document',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  document: string;
}
