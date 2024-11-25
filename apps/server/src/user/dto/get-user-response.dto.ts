import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Types } from 'mongoose';

export class GetResponseUserDto {
  @Exclude()
  readonly _id: Types.ObjectId;

  @ApiProperty({
    description: 'The documents',
    example: 'document',
  })
  @Expose()
  readonly documents: string[];

  @ApiProperty({
    description: 'The email of the user',
    example: 'testEmail',
    name: 'email',
    required: true,
    type: String,
  })
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @Exclude()
  readonly password: string;

  @Expose()
  refresh: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'testUsername',
    name: 'username',
    required: true,
    type: String,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  readonly username: string;

  constructor(partial: Partial<GetResponseUserDto>) {
    Object.assign(this, partial);
  }
}
