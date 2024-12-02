import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  readonly _id: Types.ObjectId;
  readonly email: string;
  readonly password: string;
  readonly refresh: string;
  readonly username: string;
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: false,
    type: [String],
  })
  documents: string[];

  @Prop({
    index: true,
    required: true,
    type: String,
    unique: true,
  })
  uId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
