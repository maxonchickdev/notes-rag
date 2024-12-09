import { IsNotEmpty, IsString } from 'class-validator';

export class ChatResponseDataDto {
  @IsNotEmpty()
  @IsString()
  generated_response: string;
}
