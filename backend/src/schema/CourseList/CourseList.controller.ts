// course-list.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CourseListService } from './CourseList.service';
import { CourseList } from './CourseList.schema';

@Controller('course-lists')
export class CourseListController {
  constructor(private readonly courseListService: CourseListService) {}

  @Post()
  async create(@Body() courseList: CourseList) {
    return this.courseListService.create(courseList);
  }

  @Get()
  async findAll() {
    return this.courseListService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.courseListService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() courseList: CourseList) {
    return this.courseListService.update(id, courseList);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.courseListService.remove(id);
  }

  @Get('year-session')
  async findByYearAndSession(
    @Query('year') year: number,
    @Query('session') session: string,
  ) {
    return this.courseListService.findByYearAndSession(year, session);
  }

  @Get('is-reg')
  async findByIsReg(@Query('isReg') isReg: boolean) {
    return this.courseListService.findByIsReg(isReg);
  }
}
