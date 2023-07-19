import { messageDto } from './dto/message.Dto';
import { Socket } from 'socket.io';
export declare class MessagesGateway {
    server: any;
    MessagesService: any;
    handleMessage(messageDto: messageDto): void;
    handleSendMessage(client: Socket, data: any): void;
    handleJoinRoom(client: Socket, data: any): void;
}
