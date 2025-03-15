import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../User/User.schema';
import { Section } from '../Section/Section.schema';

export type RecordDocument = Record & Document;

@Schema()
export class Record {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Section' })
  section: Section;

  @Prop({ type: Number })
  grade: number;

  @Prop({ type: String })
  standing: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
