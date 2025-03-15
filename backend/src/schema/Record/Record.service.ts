// record.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Record, RecordDocument } from './Record.schema';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Record.name) private recordModel: Model<RecordDocument>,
  ) {}

  async create(record: Record): Promise<Record> {
    const createdRecord = new this.recordModel(record);
    return createdRecord.save();
  }

  async findAll(): Promise<Record[]> {
    return this.recordModel.find().populate('user').populate('section').exec();
  }

  async findById(id: string): Promise<Record | null> {
    return this.recordModel
      .findById(id)
      .populate('user')
      .populate('section')
      .exec();
  }

  async update(id: string, record: Record): Promise<Record | null> {
    return this.recordModel
      .findByIdAndUpdate(id, record, { new: true })
      .populate('user')
      .populate('section')
      .exec();
  }

  async remove(id: string): Promise<Record | null> {
    return this.recordModel.findByIdAndDelete(id).exec();
  }

  async findByUserId(userId: string): Promise<Record[]> {
    return this.recordModel
      .find({ user: userId })
      .populate('user')
      .populate('section')
      .exec();
  }

  async findBySectionId(sectionId: string): Promise<Record[]> {
    return this.recordModel
      .find({ section: sectionId })
      .populate('user')
      .populate('section')
      .exec();
  }

  async findByUserIdAndSectionId(
    userId: string,
    sectionId: string,
  ): Promise<Record | null> {
    return this.recordModel
      .findOne({ user: userId, section: sectionId })
      .populate('user')
      .populate('section')
      .exec();
  }
}
