// user.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './User.service';
import { User, UserDocument } from './User.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('login')
  async login(@Body() loginInfo: Object): Promise<UserDocument | null> {
    if (
      Object.keys(loginInfo).includes('email') &&
      Object.keys(loginInfo).includes('password')
    ) {
      var document = await this.userService.findByEmail(loginInfo['email']);
      if (document && document.password == loginInfo['password']) {
        return await this.userService.findById(document.id);
      }
    }
    return null;
  }
}
