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
import { RecordService } from './Record.service';
import { Record } from './Record.schema';

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  async create(@Body() record: Record): Promise<Record> {
    return this.recordService.create(record);
  }

  @Get()
  async findAll(): Promise<Record[]> {
    return this.recordService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Record | null> {
    return this.recordService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() record: Record,
  ): Promise<Record | null> {
    return this.recordService.update(id, record);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Record | null> {
    return this.recordService.remove(id);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<Record[]> {
    return this.recordService.findByUserId(userId);
  }

  @Get('section/:sectionId')
  async findBySectionId(
    @Param('sectionId') sectionId: string,
  ): Promise<Record[]> {
    return this.recordService.findBySectionId(sectionId);
  }

  @Get('user-section')
  async findByUserIdAndSectionId(
    @Query('userId') userId: string,
    @Query('sectionId') sectionId: string,
  ): Promise<Record | null> {
    return this.recordService.findByUserIdAndSectionId(userId, sectionId);
  }
}
