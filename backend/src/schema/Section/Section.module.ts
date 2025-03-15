// section.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Section, SectionSchema } from './Section.schema';
import { SectionService } from './Section.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }]),
  ],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionModule {}
