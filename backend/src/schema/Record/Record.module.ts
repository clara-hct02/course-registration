// record.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Record, RecordSchema } from './Record.schema';
import { RecordService } from './Record.service';
import { RecordController } from './Record.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Record.name, schema: RecordSchema }]),
  ],
  providers: [RecordService],
  controllers: [RecordController],
  exports: [RecordService],
})
export class RecordModule {}
