import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop()
  isDone: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  userId: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
