import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class InputsDto {
  @IsArray()
  @IsString({ each: true })
  sentences: string[];

  @IsNotEmpty()
  @IsString()
  source_sentence: string;
}

export class ChatRequestDataDto {
  @Type(() => InputsDto)
  @ValidateNested()
  inputs: InputsDto;
}
