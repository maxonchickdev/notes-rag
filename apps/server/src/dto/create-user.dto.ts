import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    name: 'username',
    required: true,
    example: 'testUsername',
    description: 'The username of the user',
  })
  readonly username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    name: 'email',
    required: true,
    example: 'testEmail',
    description: 'The email of the user',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    name: 'password',
    required: true,
    example: 'testPassword',
    description: 'The password of the user',
  })
  readonly password: string;
}
