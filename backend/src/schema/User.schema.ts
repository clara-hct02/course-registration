import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Section } from './section.schema';
import { CourseList } from './CourseList.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseList' }] })
  registrations: CourseList[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseList' }] })
  worklists: CourseList[];
}

export const UserSchema = SchemaFactory.createForClass(User);
