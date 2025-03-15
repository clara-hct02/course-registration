// course-list.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseList, CourseListDocument } from './CourseList.schema';

@Injectable()
export class CourseListService {
  constructor(
    @InjectModel(CourseList.name)
    private courseListModel: Model<CourseListDocument>,
  ) {}

  async create(courseList: CourseList): Promise<CourseListDocument> {
    const createdCourseList = new this.courseListModel(courseList);
    return createdCourseList.save();
  }

  async findAll(): Promise<CourseListDocument[]> {
    return this.courseListModel.find().exec();
  }

  async findById(id: string): Promise<CourseListDocument | null> {
    return this.courseListModel.findById(id).exec();
  }

  async update(
    id: string,
    courseList: CourseList,
  ): Promise<CourseListDocument | null> {
    return this.courseListModel
      .findByIdAndUpdate(id, courseList, { new: true })
      .exec();
  }

  async remove(id: string): Promise<CourseListDocument | null> {
    return this.courseListModel.findByIdAndDelete(id).exec();
  }

  async findByYearAndSession(
    year: number,
    session: string,
  ): Promise<CourseListDocument[]> {
    return this.courseListModel.find({ year, session }).exec();
  }

  async findByIsReg(isReg: boolean): Promise<CourseListDocument[]> {
    return this.courseListModel.find({ isReg: isReg }).exec();
  }
}
