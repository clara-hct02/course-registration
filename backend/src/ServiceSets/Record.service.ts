import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Record, RecordDocument } from 'src/schema/Record.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Record.name)
    private RecordModel: Model<RecordDocument>,
  ) {}
}
