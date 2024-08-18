import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateUserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }

  @Get(':tag')
  getOne(@Param('tag') tag: string) {
    return this.userService.getOne(tag);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, updateUserDTO: CreateUserDTO) {
    return this.userService.update(id, updateUserDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.userService.delete(id);
  }
}
