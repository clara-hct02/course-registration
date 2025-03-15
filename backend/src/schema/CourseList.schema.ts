import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseListDocument = CourseList & Document;

@Schema()
export class CourseList {}

export const CourseListSchema = SchemaFactory.createForClass(CourseList);
