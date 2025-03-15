import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available across all modules
      envFilePath: '.env', // Path to your .env file
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
