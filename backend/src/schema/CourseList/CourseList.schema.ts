import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Section } from '../Section/Section.schema';

export type CourseListDocument = CourseList & Document;

@Schema()
export class CourseList {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }] })
  courses: Section[];

  @Prop({ type: Boolean })
  isReg: boolean;

  @Prop({ type: Number })
  year: number;

  @Prop({ type: String })
  session: string;
}

export const CourseListSchema = SchemaFactory.createForClass(CourseList);
