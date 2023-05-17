import mongoose from 'mongoose';
import { User } from './userSchema';
export type MessageDocument = Message & Document;
export declare class Message {
    sender: User;
    reciver: User;
    content: string;
    date: number;
    chatId: string;
}
export declare const MessageSchema: mongoose.Schema<Message, mongoose.Model<Message, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Message>;
