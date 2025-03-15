import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section, SectionDocument } from 'src/schema/section.schema';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name)
    private SectionsModel: Model<SectionDocument>,
  ) {}
}
