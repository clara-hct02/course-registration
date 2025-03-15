// course.service.ts

import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './Course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(course: Course): Promise<Course> {
    const createdCourse = new this.courseModel(course);
    return createdCourse.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findById(id: string): Promise<Course | null> {
    return this.courseModel.findById(id).exec();
  }

  async update(id: string, course: Course): Promise<Course | null> {
    return this.courseModel.findByIdAndUpdate(id, course, { new: true }).exec();
  }

  async remove(id: string): Promise<Course | null> {
    return this.courseModel.findByIdAndDelete(id).exec();
  }

  async findByDept(dept: string): Promise<Course[]> {
    return this.courseModel.find({ dept: dept }).exec();
  }

  async findByCourseCode(courseCode: string): Promise<Course[]> {
    return this.courseModel.find({ courseCode: courseCode }).exec();
  }

  async findByTitle(title: string): Promise<Course[]> {
    return this.courseModel.find({ title: title }).exec();
  }

  async findEqualYearLevel(year: number): Promise<Course[]> {
      var digit = (year - (year % 100)) / 100;
      var regexp = new RegExp("^" + digit);
      return this.courseModel.find({couseCode: regexp}).exec();
  }

  async findGreaterYearLevel(year: number): Promise<Course[]> {
      var hundreds = (year - (year % 100)) + 99;
      return this.courseModel.find({courseCode: {"$gt": hundreds.toString()}}).exec();
  }

  async findLesserYearLevel(year: number): Promise<Course[]> {
      var hundreds = (year - (year % 100));
      return this.courseModel.find({courseCode: {"$lt": hundreds.toString()}}).exec();
  }
}