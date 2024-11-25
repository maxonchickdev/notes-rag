import { ApiProperty } from '@nestjs/swagger';
import { ICreateUser } from '@notes-rag/shared';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 *
 */
export class CreateUserDto implements ICreateUser {
  @ApiProperty({
    description: 'The email of the user',
    example: 'testEmail',
    name: 'email',
    required: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'testPassword',
    name: 'password',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'testUsername',
    name: 'username',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  readonly username: string;
}
