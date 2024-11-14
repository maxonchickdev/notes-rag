import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
