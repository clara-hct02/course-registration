import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from 'src/schema/Course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private CoursModel: Model<CourseDocument>,
  ) {}
}
