import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import {  Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/Schemas/userSchema';

type Message = {
  reciverId: string;
  senderId: string;
  content: string;
  name: string;
  date: Number;
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

    if (this.users.get(data.reciverId) != undefined) {
      this.server.to(this.users.get(data.reciverId)).emit('recived', data);
      this.server.to(this.users.get(data.senderId)).emit('recived', data);
    }
  }
}
