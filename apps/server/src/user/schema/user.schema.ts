import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  readonly _id: Types.ObjectId;
  readonly email: string;
  readonly password: string;
  readonly refresh: string;
  readonly username: string;
}

/**
 *
 */
@Schema({ timestamps: true })
export class User {
  @Prop({
    required: false,
    type: [String],
  })
  documents: string[];

  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;

  @Prop({
    default: null,
    type: String,
  })
  refresh: string;

  @Prop({
    required: true,
    type: String,
  })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
