import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { TodoDTO } from './todo.dto';
import { Todo, TodoDocument } from './todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(
    createTodoDTO: TodoDTO,
    userId: ObjectId,
  ): Promise<{
    id: mongoose.Types.ObjectId;
    title: string;
    isDone: boolean;
  }> {
    const user = await this.userModel.findById(userId);
    const todo = await this.todoModel.create({
      ...createTodoDTO,
      userId,
    });
    if (user) {
      user.todos.push(todo);
      await user.save();

      const { _id, title, isDone } = todo;
      return { id: _id, title, isDone };
    }

    throw new HttpException('user not found', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async getByUserId(userId: ObjectId): Promise<
    {
      id: mongoose.Types.ObjectId;
      title: string;
      isDone: boolean;
    }[]
  > {
    const todos = await this.todoModel
      .find({ userId })
      .select('_id title isDone')
      .lean()
      .exec();

    return todos.map((todo) => ({
      id: todo._id,
      title: todo.title,
      isDone: todo.isDone,
    }));
  }

  async update(
    id: ObjectId,
    updateTodoDTO: TodoDTO,
  ): Promise<{
    id: mongoose.Types.ObjectId;
    title: string;
    isDone: boolean;
  }> {
    const todo = await this.todoModel
      .findByIdAndUpdate(id, updateTodoDTO, { new: true })
      .lean()
      .exec();

    if (todo) {
      const { _id, title, isDone } = todo;
      return { id: _id, title, isDone };
    }

    throw new HttpException('todo not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: ObjectId): Promise<Pick<TodoDocument, '_id'>> {
    const todo = await this.todoModel.findByIdAndDelete(id);
    if (todo) return todo._id;
    throw new HttpException('todo not found', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
