import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TodoDTO, UpdateTodoDTO } from './todo.dto';
import { TodoService } from './todo.service';

@ApiTags('Todo') // Grouping endpoints under the "Todo" tag in Swagger
@Controller('/todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  @ApiOperation({ summary: 'Create a new todo for a user' })
  @ApiParam({
    name: 'userId',
    description: 'ID of the user creating the todo',
    type: String,
  })
  @ApiResponse({ status: 201, description: 'Todo successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() createTodoDTO: TodoDTO,
    @Param('userId') userId: ObjectId,
  ) {
    return await this.todoService.create(createTodoDTO, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/findByUser/:userId')
  @ApiOperation({ summary: 'Get todos for a specific user' })
  @ApiParam({
    name: 'userId',
    description: 'ID of the user whose todos to retrieve',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'List of todos for the user',
    type: [TodoDTO],
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  getByUserId(@Param('userId') userId: ObjectId) {
    return this.todoService.getByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing todo' })
  @ApiParam({
    name: 'id',
    description: 'ID of the todo to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Todo successfully updated',
    type: TodoDTO,
  })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async update(
    @Param('id') id: ObjectId,
    @Body() updateTodoDTO: UpdateTodoDTO,
  ) {
    return await this.todoService.update(id, updateTodoDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an existing todo' })
  @ApiParam({
    name: 'id',
    description: 'ID of the todo to delete',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Todo successfully deleted' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async delete(@Param('id') id: ObjectId) {
    return await this.todoService.delete(id);
  }
}
