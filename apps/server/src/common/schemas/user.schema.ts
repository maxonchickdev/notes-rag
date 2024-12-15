import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { DocumentDto } from '../../app/notion/dto/document.dto';
import { RagHistoryDto } from '../../app/rag/dto/rag-history.dto';

export interface IUser extends Document {
  readonly _id: Types.ObjectId;
  readonly documents: DocumentDto[];
  readonly notionApiToken: string;
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

  @Prop({
    _id: false,
    required: false,
    type: [
      {
        query: { required: false, type: String },
        response: { required: false, type: String },
      },
    ],
  })
  ragHistory: RagHistoryDto[];
}

export const UserSchema = SchemaFactory.createForClass(User);
