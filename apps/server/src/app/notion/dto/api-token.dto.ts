import { ApiProperty } from '@nestjs/swagger';
import { INotionApiToken } from '@notes-rag/shared';
import { IsNotEmpty, IsString } from 'class-validator';

export class ApiTokenDto implements INotionApiToken {
  @ApiProperty({
    description: 'Notion api token',
    example: 'ntn_....',
    name: 'token',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
