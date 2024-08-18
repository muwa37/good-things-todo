import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Todo } from 'src/todo/todo.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  tag: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'friend' }] })
  friend: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'todo' }] })
  todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
