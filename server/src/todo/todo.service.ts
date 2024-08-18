import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from 'src/user/user.schema';
import { TodoDTO } from './todo.dto';
import { Todo } from './todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createTodoDTO: TodoDTO, userId: ObjectId): Promise<Todo> {
    const user = await this.userModel.findById(userId);
    const todo = await this.todoModel.create({
      ...createTodoDTO,
      isDone: false,
      userId,
    });
    if (user) {
      user.todos.push(todo);
      await user.save();
      return todo;
    }

    throw new HttpException('user not found', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async getByUserId(userId: ObjectId): Promise<Todo[]> {
    const todos = await this.todoModel.find({ userId });
    return todos;
  }

  async update(id: ObjectId, updateTodoDTO: TodoDTO): Promise<Todo> {
    const todo = await this.todoModel.findByIdAndUpdate(id, updateTodoDTO);
    if (todo) return todo;
    throw new HttpException('todo not found', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async delete(id: ObjectId): Promise<Todo> {
    const todo = await this.todoModel.findByIdAndDelete(id);
    if (todo) return todo;
    throw new HttpException('todo not found', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
