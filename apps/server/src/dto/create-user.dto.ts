import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the user',
    example: 'testEmail',
    name: 'email',
    required: true,
    type: 'string',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The password of the user',
    example: 'testPassword',
    name: 'password',
    required: true,
    type: 'string',
  })
  readonly password: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The username of the user',
    example: 'testUsername',
    name: 'username',
    required: true,
    type: 'string',
  })
  readonly username: string;
}
