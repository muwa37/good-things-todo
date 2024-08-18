import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDTO } from './user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const user = await this.userModel.create({ ...createUserDTO });
    return user;
  }

  async getOne(tag: string): Promise<User | null> {
    const user = await this.userModel.findOne({ tag });
    return user;
  }

  async update(
    id: ObjectId,
    updateUserDTO: CreateUserDTO,
  ): Promise<User | null> {
    const user = await this.userModel.findByIdAndUpdate(id, {
      ...updateUserDTO,
    });

    return user;
  }

  async delete(id: ObjectId): Promise<User | null> {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
  }
}
