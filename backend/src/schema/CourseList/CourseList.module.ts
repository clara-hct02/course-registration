import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseList, CourseListSchema } from './CourseList.schema';
import { CourseListService } from './CourseList.service';
import { CourseListController } from './CourseList.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseList.name, schema: CourseListSchema },
    ]),
  ],
  providers: [CourseListService],
  controllers: [CourseListController],
  exports: [CourseListService],
})
export class CourseListModule {}
