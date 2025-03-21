// section.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section, SectionDocument } from './Section.schema';
import { Course } from '../Course/Course.schema';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
  ) {}

  async create(section: Section): Promise<SectionDocument> {
    const createdSection = new this.sectionModel(section);
    return createdSection.save();
  }

  async findAll(): Promise<SectionDocument[]> {
    return this.sectionModel.find().exec();
  }

  async findById(id: string): Promise<SectionDocument | null> {
    return this.sectionModel.findById(id).exec();
  }

  async update(id: string, section: Section): Promise<SectionDocument | null> {
    return this.sectionModel
      .findByIdAndUpdate(id, section, { new: true })
      .exec();
  }

  async remove(id: string): Promise<SectionDocument | null> {
    return this.sectionModel.findByIdAndDelete(id).exec();
  }

  async findByCourse(courseId: string): Promise<SectionDocument[]> {
    return this.sectionModel.find({ course: courseId }).exec();
  }

  async findBySectionCode(sectionCode: string): Promise<SectionDocument[]> {
    return this.sectionModel.find({ sectionCode: sectionCode }).exec();
  }

  async findByYear(year: number): Promise<SectionDocument[]> {
    return this.sectionModel.find({ year: year }).populate('course').exec();
  }

  async findBySession(session: string): Promise<SectionDocument[]> {
    return this.sectionModel.find({ session: session }).exec();
  }

  async findByProf(prof: string): Promise<SectionDocument[]> {
    return this.sectionModel.find({ prof: prof }).populate('course').exec();
  }

  async findByCapacityGreaterThan(
    capacity: number,
  ): Promise<SectionDocument[]> {
    return this.sectionModel.find({ capacity: { $gt: capacity } }).exec();
  }

  async findByCapacityLessThan(capacity: number): Promise<SectionDocument[]> {
    return this.sectionModel.find({ capacity: { $lt: capacity } }).exec();
  }

  async findByCurrentRegisteredGreaterThan(
    currentRegistered: number,
  ): Promise<SectionDocument[]> {
    return this.sectionModel
      .find({ currentRegistered: { $gt: currentRegistered } })
      .exec();
  }

  async findByCurrentRegisteredLessThan(
    currentRegistered: number,
  ): Promise<SectionDocument[]> {
    return this.sectionModel
      .find({ currentRegistered: { $lt: currentRegistered } })
      .exec();
  }

  async findByWaitlist(waitlist: boolean): Promise<SectionDocument[]> {
    return this.sectionModel.find({ waitlist: waitlist }).exec();
  }
}
