// user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './User.schema';
import { CourseList } from '../CourseList/CourseList.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<UserDocument> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel
      .find()
      .select('-password')
      .populate('CourseList')
      .exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).populate('CourseList').exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).populate('CourseList').exec();
  }

  async update(id: string, user: User): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .populate('CourseList')
      .exec();
  }

  async remove(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndDelete(id).populate('CourseList').exec();
  }
}
