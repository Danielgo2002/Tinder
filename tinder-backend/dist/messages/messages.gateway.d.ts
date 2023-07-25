import { OnGatewayConnection } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Model } from 'mongoose';
import { UserDocument } from 'src/Schemas/userSchema';
import { ChatDocument } from 'src/Schemas/chatSchema';
import { MessageDocument } from 'src/Schemas/messageSchemas';
type Message = {
    reciverId: string;
    senderId: string;
    content: string;
    name: string;
    date: Number;
};
export declare class MessagesGateway implements OnGatewayConnection {
    private readonly UserModel;
    private readonly ChatModel;
    private readonly MessageModel;
    server: Socket;
    users: Map<string, string>;
    constructor(UserModel: Model<UserDocument>, ChatModel: Model<ChatDocument>, MessageModel: Model<MessageDocument>);
    handleConnection(client: Socket): void;
    handleMessage(data: Message): Promise<void>;
}
export {};
