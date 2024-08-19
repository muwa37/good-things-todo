import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UpdateUserDTO, UserDTO } from './user.dto';
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

  async getOneById(id: ObjectId): Promise<User> {
    const user = await this.userModel.findById(id);
    if (user) return user;
    throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
  }

  async getFriendsById(id: ObjectId): Promise<User[]> {
    const user = await this.userModel.findById(id);
    if (user) return user.friends;
    throw new HttpException('user not found', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async update(id: ObjectId, updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, {
      ...updateUserDTO,
    });
    if (user) return user;
    throw new HttpException('user not found', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async addFriend(id: ObjectId, friendId: ObjectId): Promise<User> {
    const user = await this.userModel.findById(id);
    console.log(friendId);
    const friend = await this.userModel.findById(friendId);
    if (user && friend) {
      user.friends.push(friend);
      return friend;
    }
    throw new HttpException(
      'user or friend not found',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async delete(id: ObjectId): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (user) return user;
    throw new HttpException('user not found', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
