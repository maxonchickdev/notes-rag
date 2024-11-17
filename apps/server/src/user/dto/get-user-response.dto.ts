import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Types } from 'mongoose';

export class GetResponseUserDto {
    @Exclude()
    readonly _id: Types.ObjectId;

    @Expose()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
    	description: 'The email of the user',
    	example: 'testEmail',
    	name: 'email',
    	required: true,
    	type: String,
    })
    readonly email: string;

    @Exclude()
    readonly password: string;

    @Expose()
    refresh: string;

    @Expose()
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty({
    	description: 'The username of the user',
    	example: 'testUsername',
    	name: 'username',
    	required: true,
    	type: String,
    })
    readonly username: string;

    @Expose()
    @ApiProperty({
        description: 'The documents',
        example: 'document',
    })
    readonly documents: string[];

    /**
     *
     * @param partial
     */
    constructor(partial: Partial<GetResponseUserDto>) {
    	Object.assign(this, partial);
    }
}
