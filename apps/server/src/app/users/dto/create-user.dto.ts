import { ApiProperty } from '@nestjs/swagger';
import { ICreateUserWithUid } from '@notes-rag/shared';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 *
 */
export class CreateUserDto implements ICreateUserWithUid {
  @ApiProperty({
    description: 'Unique user id',
    example: 'vKSpaTpqnVdJIFJlOKZa5LfL1hC2',
    name: 'uId',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly uId: string;
}
