import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './userSchema';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @Prop()
  content: string;

  @Prop()
  date: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User;
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);
