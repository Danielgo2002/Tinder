import { OnGatewayConnection } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Model } from 'mongoose';
import { UserDocument } from 'src/Schemas/userSchema';
type Message = {
    message: string;
    userId: string;
};
export declare class MessagesGateway implements OnGatewayConnection {
    private readonly UserModel;
    server: Socket;
    users: Map<string, string>;
    constructor(UserModel: Model<UserDocument>);
    handleConnection(client: Socket): void;
    handleMessage(data: Message): void;
}
export {};
