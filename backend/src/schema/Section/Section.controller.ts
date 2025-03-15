import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { SectionService } from './Section.service';
import { Section } from './Section.schema';

@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  async create(@Body() section: Section) {
    return this.sectionService.create(section);
  }

  @Get()
  async findAll() {
    return this.sectionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sectionService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() section: Section) {
    return this.sectionService.update(id, section);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sectionService.remove(id);
  }

  @Get('course/:courseId')
  async findByCourse(@Param('courseId') courseId: string) {
    return this.sectionService.findByCourse(courseId);
  }

  @Get('sectionCode/:sectionCode')
  async findBySectionCode(@Param('sectionCode') sectionCode: string) {
    return this.sectionService.findBySectionCode(sectionCode);
  }

  @Get('year/:year')
  async findByYear(@Param('year') year: number) {
    return this.sectionService.findByYear(year);
  }

  @Get('session/:session')
  async findBySession(@Param('session') session: string) {
    return this.sectionService.findBySession(session);
  }

  @Get('prof/:prof')
  async findByProf(@Param('prof') prof: string) {
    return this.sectionService.findByProf(prof);
  }

  @Get('capacity/greaterThan')
  async findByCapacityGreaterThan(@Query('capacity') capacity: number) {
    return this.sectionService.findByCapacityGreaterThan(capacity);
  }

  @Get('capacity/lessThan')
  async findByCapacityLessThan(@Query('capacity') capacity: number) {
    return this.sectionService.findByCapacityLessThan(capacity);
  }

  @Get('currentRegistered/greaterThan')
  async findByCurrentRegisteredGreaterThan(
    @Query('currentRegistered') currentRegistered: number,
  ) {
    return this.sectionService.findByCurrentRegisteredGreaterThan(
      currentRegistered,
    );
  }

  @Get('currentRegistered/lessThan')
  async findByCurrentRegisteredLessThan(
    @Query('currentRegistered') currentRegistered: number,
  ) {
    return this.sectionService.findByCurrentRegisteredLessThan(
      currentRegistered,
    );
  }

  @Get('waitlist/:waitlist')
  async findByWaitlist(@Param('waitlist') waitlist: boolean) {
    return this.sectionService.findByWaitlist(waitlist);
  }
}
