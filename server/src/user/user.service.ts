import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserDTO } from './user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDTO: UserDTO): Promise<User> {
    const user = await this.userModel.create({ ...createUserDTO });
    return user;
  }

  async searchByTag(tag: string): Promise<User[]> {
    const users = await this.userModel.find({
      tag: { $regex: new RegExp(tag) },
    });
    return users;
  }

  async getOneByTag(tag: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      tag: tag,
    });
    return user;
  }

  async getOneById(id: ObjectId): Promise<User | null> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async getFriendsById(id: ObjectId): Promise<User[] | null> {
    const user = await this.userModel.findById(id);
    if (user) return user.friends;
    return null;
  }

  async update(id: ObjectId, updateUserDTO: UserDTO): Promise<User | null> {
    const user = await this.userModel.findByIdAndUpdate(id, {
      ...updateUserDTO,
    });

    return user;
  }

  async addFriend(id: ObjectId, friendId: ObjectId): Promise<User | null> {
    const user = await this.userModel.findById(id);
    console.log(friendId);
    const friend = await this.userModel.findById(friendId);
    if (user && friend) {
      user.friends.push(friend);
      return friend;
    }
    return null;
  }

  async delete(id: ObjectId): Promise<User | null> {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
  }
}
