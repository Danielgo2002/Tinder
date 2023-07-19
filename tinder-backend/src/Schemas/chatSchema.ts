import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Message } from './messageSchemas';
import { User } from './userSchema';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] })
  messages: Message[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  })
  participants: User[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
