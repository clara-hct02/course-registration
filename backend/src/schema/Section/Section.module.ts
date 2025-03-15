// section.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Section, SectionSchema } from './Section.schema';
import { SectionService } from './Section.service';
import { SectionController } from './Section.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }]),
  ],
  providers: [SectionService],
  controllers: [SectionController],
  exports: [SectionService],
})
export class SectionModule {}
