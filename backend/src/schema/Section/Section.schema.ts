import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Course } from '../Course/Course.schema';

export type SectionDocument = Section & Document;

@Schema()
export class Section {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: Course;

  @Prop({ type: String })
  sectionCode: string;

  @Prop({ type: Number })
  year: number;

  @Prop({ type: String })
  session: string;

  @Prop({ type: Number })
  capacity: number;

  @Prop({ type: Number })
  currentRegistered: number;

  @Prop({ type: Boolean })
  waitlist: boolean;

  @Prop({ type: String })
  prof: string[];

  @Prop({ type: String })
  meetingTimes: String[];

  @Prop({ type: String })
  startTime: string;

  @Prop({ type: Number })
  meetingLength: number;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
