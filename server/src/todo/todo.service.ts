import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { TodoDTO } from './todo.dto';
import { Todo, TodoDocument } from './todo.schema';

type TodoData = {
  id: mongoose.Types.ObjectId;
  title: string;
  isDone: boolean;
};

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  private mapTodoData(todo: TodoDocument): TodoData {
    const { _id, title, isDone } = todo;
    return { id: _id, title, isDone };
  }

  async create(createTodoDTO: TodoDTO, userId: ObjectId): Promise<TodoData> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const todo = await this.todoModel.create({
      ...createTodoDTO,
      userId,
    });

    user.todos.push(todo);
    await user.save();

    return this.mapTodoData(todo);
  }

  async getByUserId(userId: ObjectId): Promise<TodoData[]> {
    const todos = await this.todoModel
      .find({ userId })
      .select('_id title isDone')
      .lean()
      .exec();

    return todos.map(this.mapTodoData);
  }

  async update(id: ObjectId, updateTodoDTO: TodoDTO): Promise<TodoData> {
    const todo = await this.todoModel
      .findByIdAndUpdate(id, updateTodoDTO, { new: true })
      .lean()
      .exec();

    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    return this.mapTodoData(todo);
  }

  async delete(id: ObjectId): Promise<{ _id: mongoose.Types.ObjectId }> {
    const todo = await this.todoModel.findByIdAndDelete(id).lean().exec();
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return { _id: todo._id };
  }
}
