import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { DocumentDto } from '../../app/notion/dto/document.dto';

export interface IUser extends Document {
  readonly _id: Types.ObjectId;
  readonly email: string;
  readonly notionApiToken: string;
  readonly password: string;
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    _id: false,
    required: false,
    type: [DocumentDto],
  })
  documents: DocumentDto[];

  @Prop({
    required: false,
    type: String,
    unique: true,
  })
  notionApiToken: string;

  @Prop({
    index: true,
    required: true,
    type: String,
    unique: true,
  })
  uId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
