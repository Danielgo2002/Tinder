import mongoose from 'mongoose';
import { Chat } from './chatSchema';
import { User } from './userSchema';
export type MessageDocument = Message & Document;
export declare class Message {
    sender: User;
    reciver: User;
    content: string;
    date: number;
    chat: Chat;
}
export declare const MessageSchema: mongoose.Schema<Message, mongoose.Model<Message, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Message>;
