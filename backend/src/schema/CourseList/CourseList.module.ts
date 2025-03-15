import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseList, CourseListSchema } from './CourseList.schema';
import { CourseListService } from './CourseList.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseList.name, schema: CourseListSchema },
    ]),
  ],
  providers: [CourseListService],
  exports: [CourseListService],
})
export class CourseListModule {}
