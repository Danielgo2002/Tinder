import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { messageDto } from './dto/message.Dto';
import { Server, Socket } from 'socket.io';
import { Get, Request, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/Schemas/userSchema';
import { AUthGuard } from 'src/Auth/auth.guard';

type Message = {
  message: string;
  userId: string;
};
@WebSocketGateway({
  cors: '*',
})
export class MessagesGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Socket;

  users: Map<string, string>;

  constructor(
    @InjectModel('User') private readonly UserModel: Model<UserDocument>,
  ) {
    this.users = new Map<string, string>();
  }

  handleConnection(client: Socket) {
    const mongoId = client.handshake.query.id as string;

    this.users.set(mongoId, client.id);
  }

  @SubscribeMessage('sendToUser')
  handleMessage(@MessageBody() data: Message): void {
    console.log(this.users);
    console.log(data);

    if (this.users.get(data.userId) != undefined) {

      this.server.to(this.users.get(data.userId)).emit('recived', data.message);
    }
  }
}
