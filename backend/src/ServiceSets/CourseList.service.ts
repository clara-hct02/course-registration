import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseList, CourseListDocument } from 'src/schema/CourseList.schema';

@Injectable()
export class CourseListService {
  constructor(
    @InjectModel(CourseList.name)
    private RecordModel: Model<CourseListDocument>,
  ) {}
}
