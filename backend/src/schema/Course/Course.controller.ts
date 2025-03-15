// course.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CourseService } from './Course.service';
import { Course } from './Course.schema';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() course: Course): Promise<Course> {
    return this.courseService.create(course);
  }

  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Course | null> {
    return this.courseService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() course: Course,
  ): Promise<Course | null> {
    return this.courseService.update(id, course);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Course | null> {
    return this.courseService.remove(id);
  }

  @Get('dept/:dept')
  async findByDept(@Param('dept') dept: string): Promise<Course[]> {
    return this.courseService.findByDept(dept);
  }

  @Get('code/:courseCode')
  async findByCourseCode(
    @Param('courseCode') courseCode: string,
  ): Promise<Course[]> {
    return this.courseService.findByCourseCode(courseCode);
  }

  @Get('title/:title')
  async findByTitle(@Param('title') title: string): Promise<Course[]> {
    return this.courseService.findByTitle(title);
  }
}
