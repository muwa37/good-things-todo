import { ObjectId } from 'mongoose';

export class UserDTO {
  readonly name: string;
  readonly tag: string;
  readonly password: string;
}

export class FriendDTO {
  readonly friendId: ObjectId;
}
