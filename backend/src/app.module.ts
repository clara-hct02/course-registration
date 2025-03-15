import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './schema/Course/Course.module';
import { CourseListModule } from './schema/CourseList/CourseList.module';
import { RecordModule } from './schema/Record/Record.module';
import { SectionModule } from './schema/Section/Section.module';
import { UserModule } from './schema/User/User.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available across all modules
      envFilePath: '.env', // Path to your .env file
    }),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule,
        CourseModule,
        CourseListModule,
        RecordModule,
        SectionModule,
        UserModule,
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
        // other options...
      }),
    }),
    // UserModule,
    // SectionModule,
    // RecordModule,
    // CourseListModule,
    // CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
