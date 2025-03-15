// course.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './Course.schema';
import { CourseService } from './Course.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  providers: [CourseService],
  exports: [CourseService], // Export the service if you need to use it in other modules
})
export class CourseModule {}
