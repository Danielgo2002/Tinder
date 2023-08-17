import { Model } from 'mongoose';
import { ChatDocument } from 'src/Schemas/chatSchema';
import { MessageDocument } from 'src/Schemas/messageSchemas';
import { UserDocument } from 'src/Schemas/userSchema';
export declare class MessagesService {
    private readonly UserModel;
    private readonly ChatModel;
    private readonly MessageModel;
    constructor(UserModel: Model<UserDocument>, ChatModel: Model<ChatDocument>, MessageModel: Model<MessageDocument>);
    getMessages(senderId: string, reciverId: string): Promise<any[] | {
        messages: {
            date: number;
            content: string;
            senderId: any;
            reciverId: any;
        }[];
        blockedUser: string;
    }>;
}
