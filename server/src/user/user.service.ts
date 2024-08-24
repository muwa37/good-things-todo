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

  async searchByTag(tag: string): Promise<
    | {
        id: mongoose.Types.ObjectId;
        name: string;
        tag: string;
      }[]
    | null
  > {
    const users = await this.userModel.find({
      tag: { $regex: new RegExp(tag) },
    });
    return users.map((user) => ({
      id: user._id,
      name: user.name,
      tag: user.tag,
    }));
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

  async getFriendsById(userId: ObjectId): Promise<
    | {
        id: mongoose.Types.ObjectId;
        name: string;
        tag: string;
      }[]
    | null
  > {
    const user = await this.userModel.findById(userId).lean().exec();
    if (!user) return null;

    if (!user.friends || user.friends.length === 0) return [];

    const friends = await this.userModel
      .find({
        _id: { $in: user.friends },
      })
      .select('_id name tag')
      .lean()
      .exec();

    return friends.map((friend) => ({
      id: friend._id,
      name: friend.name,
      tag: friend.tag,
    }));
  }

  async update(
    id: ObjectId,
    updateUserDTO: UpdateUserDTO,
  ): Promise<Record<string, any> | null> {
    const oldUser = await this.userModel.findById(id).lean().exec();
    if (!oldUser) return null;

    if (updateUserDTO.tag) {
      const existingUserWithSameTag = await this.userModel
        .findOne({ tag: updateUserDTO.tag })
        .lean()
        .exec();

      if (
        existingUserWithSameTag &&
        existingUserWithSameTag._id.toString() !== id.toString()
      ) {
        throw new HttpException(
          'this tag is already taken',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    await this.userModel.findByIdAndUpdate(id, updateUserDTO, { new: true });

    const newUser = await this.userModel.findById(id).lean().exec();
    if (!newUser) return null;

    const updatedFields: Record<string, any> = {};
    for (const key of Object.keys(updateUserDTO) as (keyof User)[]) {
      if (oldUser[key] !== newUser[key]) {
        updatedFields[key] = newUser[key];
      }
    }

    return updatedFields;
  }

  async addFriend(
    userId: ObjectId,
    friendId: string,
  ): Promise<
    | {
        id: mongoose.Types.ObjectId;
        name: string;
        tag: string;
      }[]
    | null
  > {
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

    user.friends.push(friendObjectId);
    await user.save();

    const friends = await this.userModel
      .find({
        _id: { $in: user.friends },
      })
      .select('_id name tag')
      .lean()
      .exec();

    return friends.map((friend) => ({
      id: friend._id,
      name: friend.name,
      tag: friend.tag,
    }));
  }

  async removeFriend(
    userId: ObjectId,
    friendId: string,
  ): Promise<
    | {
        id: mongoose.Types.ObjectId;
        name: string;
        tag: string;
      }[]
    | null
  > {
    if (userId.toString() === friendId) {
      throw new HttpException(
        'cannot remove yourself from friends',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userModel.findById(userId);
    if (!user) return null;

    const friendObjectId = new mongoose.Types.ObjectId(friendId);

    const isFriend = user.friends.some((friend) =>
      friend.equals(friendObjectId),
    );

    if (!isFriend)
      throw new HttpException('not a friend', HttpStatus.BAD_REQUEST);

    user.friends = user.friends.filter(
      (friend) => !friend.equals(friendObjectId),
    );
    await user.save();

    const friends = await this.userModel
      .find({
        _id: { $in: user.friends },
      })
      .select('_id name tag')
      .lean()
      .exec();

    return friends.map((friend) => ({
      id: friend._id,
      name: friend.name,
      tag: friend.tag,
    }));
  }

  async delete(id: ObjectId): Promise<Pick<UserDocument, '_id'>> {
    const user = await this.userModel
      .findByIdAndDelete(id)
      .select('_id')
      .lean()
      .exec();

    if (user) {
      return user._id;
    }

    throw new HttpException('user not found', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
