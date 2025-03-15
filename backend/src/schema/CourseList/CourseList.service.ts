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
    return this.courseListModel.find().populate('courses').exec();
  }

  async findById(id: string): Promise<CourseListDocument | null> {
    return this.courseListModel.findById(id).populate('courses').exec();
  }

  async update(
    id: string,
    courseList: CourseList,
  ): Promise<CourseListDocument | null> {
    return this.courseListModel
      .findByIdAndUpdate(id, courseList, { new: true })
      .populate('courses')
      .exec();
  }

  async remove(id: string): Promise<CourseListDocument | null> {
    return this.courseListModel.findByIdAndDelete(id).exec();
  }

  async findByYearAndSession(
    year: number,
    session: string,
  ): Promise<CourseListDocument[]> {
    return this.courseListModel
      .find({ year, session })
      .populate('courses')
      .exec();
  }

  async findByIsReg(isReg: boolean): Promise<CourseListDocument[]> {
    return this.courseListModel
      .find({ isReg: isReg })
      .populate('courses')
      .exec();
  }
}
