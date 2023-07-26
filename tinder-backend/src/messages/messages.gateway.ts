import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
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
@WebSocketGateway({
  cors: '*',
})
export class MessagesGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Socket;

  users: Map<string, string>;

  constructor(
    @InjectModel('User') private readonly UserModel: Model<UserDocument>,
    @InjectModel('Chat') private readonly ChatModel: Model<ChatDocument>,
    @InjectModel('Message')
    private readonly MessageModel: Model<MessageDocument>,
  ) {
    this.users = new Map<string, string>();
  }

  handleConnection(client: Socket) {
    const mongoId = client.handshake.query.id as string;

    this.users.set(mongoId, client.id);
  }

  @SubscribeMessage('sendToUser')
  async handleMessage(@MessageBody() data: Message) {
    const myUser = await this.UserModel.findById(data.senderId).populate(
      'chats',
    );
    const otherUser = await this.UserModel.findById(data.reciverId).populate(
      'chats',
    );
    const message = await new this.MessageModel({
      sender: myUser,
      reciver: otherUser,
      content: data.content,
      date: data.date,
    });
    const chat = await this.ChatModel.findOne({
      $and: [{ participants: { $all: [myUser, otherUser] } }],
    }).populate('messages');

    chat.messages.push(message);
    message.chat = chat;
    await chat.save();
    message.save();
    this.server.to(this.users.get(data.senderId)).emit('recived', data);
    if (this.users.get(data.reciverId) != undefined) {
      this.server.to(this.users.get(data.reciverId)).emit('recived', data);
    }
  }
}
