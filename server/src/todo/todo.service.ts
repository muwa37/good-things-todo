import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { TodoDTO } from './todo.dto';
import { Todo } from './todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(createTodoDTO: TodoDTO, userId: ObjectId): Promise<Todo> {
    const todo = await this.todoModel.create({
      ...createTodoDTO,
      isDone: false,
      userId,
    });
    return todo;
  }

  async getByUserId(userId: ObjectId): Promise<Todo[]> {
    const todos = await this.todoModel.find({ userId });
    return todos;
  }

  async update(id: ObjectId, updateTodoDTO: TodoDTO): Promise<Todo | null> {
    const todo = await this.todoModel.findByIdAndUpdate(id, updateTodoDTO);

    return todo;
  }

  async delete(id: ObjectId): Promise<Todo | null> {
    const todo = await this.todoModel.findByIdAndDelete(id);
    return todo;
  }
}
