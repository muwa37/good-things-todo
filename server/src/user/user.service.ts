import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { UpdateUserDTO, UserDTO } from './user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDTO: UserDTO): Promise<UserDocument> {
    const user = await this.userModel.create({ ...createUserDTO });
    return user;
  }

  async searchByTag(tag: string): Promise<UserDocument[]> {
    const users = await this.userModel.find({
      tag: { $regex: new RegExp(tag) },
    });
    return users;
  }

  async getOneByTag(tag: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({
      tag: tag,
    });
    return user;
  }

  async getOneById(id: ObjectId): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (user) return user;
    throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
  }

  async getFriendsById(
    userId: ObjectId,
  ): Promise<mongoose.Types.ObjectId[] | null> {
    const user = await this.userModel.findById(userId).lean().exec();
    if (!user) return null;

    return user.friends;
  }

  async update(id: ObjectId, updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, {
      ...updateUserDTO,
    });
    if (user) return user;
    throw new HttpException('user not found', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async addFriend(
    userId: ObjectId,
    friendId: string,
  ): Promise<mongoose.Types.ObjectId[] | null> {
    if (userId.toString() === friendId) {
      throw new HttpException(
        'can not add yourself to friend',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userModel.findById(userId);
    if (!user) return null;

    const friendObjectId = new mongoose.Types.ObjectId(friendId);

    const isAlreadyFriend = user.friends.some((friend) =>
      friend.equals(friendObjectId),
    );

    if (isAlreadyFriend)
      throw new HttpException('already friend', HttpStatus.BAD_REQUEST);

    if (!isAlreadyFriend) {
      user.friends.push(friendObjectId);
      await user.save();
    }

    return this.getFriendsById(userId);
  }

  async delete(id: ObjectId): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (user) return user;
    throw new HttpException('user not found', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
