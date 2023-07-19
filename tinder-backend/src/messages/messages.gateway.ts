import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { messageDto } from './dto/message.Dto';
import { Server, Socket } from 'socket.io';
import { Get, Request } from '@nestjs/common';

@WebSocketGateway({
  cors: '*',
})
export class MessagesGateway {
  @WebSocketServer()
  server;
  MessagesService: any;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() messageDto: messageDto): void {
    console.log(messageDto);

    this.server.emit('message', messageDto);
  }

  // @SubscribeMessage('findAllMessages')
  // findAll() {
  //   return this.messagesService.findAll();
  // }

  // @SubscribeMessage('join')
  // joinRoom(
  //   @MessageBody('name') name: string,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   return this.messagesService.identify(name, client.id);
  // }

  // @SubscribeMessage('typing')
  // async typing(
  //   @MessageBody('isTyping') isTypeing: boolean,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   const name = await this.messagesService.getClientName(client.id);
  //   client.broadcast.emit('typing', { name, isTypeing });
  // }
}
