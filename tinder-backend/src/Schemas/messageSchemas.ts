import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './userSchema';

export type MessageDocument = Message & Document;
@Schema()
export class Message {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  sender: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  reciver: User;

  @Prop()
  content: string;

  @Prop()
  date: number;

  @Prop()
  chatId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
