import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schemas/userSchema';
import { Message, MessageSchema } from 'src/Schemas/messageSchemas';
import { Chat, ChatSchema } from 'src/Schemas/chatSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],

  providers: [MessagesGateway],
})
export class MessagesModule {}
