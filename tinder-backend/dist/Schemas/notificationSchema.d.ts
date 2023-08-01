import mongoose from 'mongoose';
import { User } from './userSchema';
export type NotificationDocument = Notification & Document;
export declare class Notification {
    content: string;
    date: number;
    user: User;
}
export declare const NotificationSchema: mongoose.Schema<Notification, mongoose.Model<Notification, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Notification>;
