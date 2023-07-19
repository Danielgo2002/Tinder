import mongoose from 'mongoose';
import { Message } from './messageSchemas';
import { User } from './userSchema';
export type ChatDocument = Chat & Document;
export declare class Chat {
    messages: Message[];
    participants: User[];
}
export declare const ChatSchema: mongoose.Schema<Chat, mongoose.Model<Chat, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Chat>;
