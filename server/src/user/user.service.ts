import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const user = await this.userModel.create({ ...createUserDTO });
    return user;
  }
}
