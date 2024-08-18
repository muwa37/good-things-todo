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
import { TodoDTO } from './todo.dto';
import { TodoService } from './todo.service';

@Controller('/todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post(':userId')
  async create(
    @Body() createTodoDTO: TodoDTO,
    @Param('userId') userId: ObjectId,
  ) {
    return await this.todoService.create(createTodoDTO, userId);
  }

  @Get('/findByUser/:userId')
  getByUserId(@Param('userId') userId: ObjectId) {
    return this.todoService.getByUserId(userId);
  }

  @Patch(':id')
  async update(@Param('id') id: ObjectId, @Body() updateTodoDTO: TodoDTO) {
    return await this.todoService.update(id, updateTodoDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: ObjectId) {
    return await this.todoService.delete(id);
  }
}
