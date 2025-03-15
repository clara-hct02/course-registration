import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true, type: String })
  dept: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  courseCode: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
