import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Todo } from 'src/todo/todo.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  tag: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }] })
  friends: mongoose.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }] })
  todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
