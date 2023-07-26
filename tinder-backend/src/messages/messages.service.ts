import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatDocument } from 'src/Schemas/chatSchema';
import { MessageDocument } from 'src/Schemas/messageSchemas';
import { UserDocument } from 'src/Schemas/userSchema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<UserDocument>,
    @InjectModel('Chat') private readonly ChatModel: Model<ChatDocument>,
    @InjectModel('Message')
    private readonly MessageModel: Model<MessageDocument>,
  ) {}

  async getMessages(senderId: string, reciverId: string) {
    try {

        
      const chat = await this.ChatModel.findOne({
        participants: { $all: [senderId, reciverId] },
      }).populate('messages');
      const messages = chat.messages;
      const result = messages.map((message) => {
        return {
          date: message.date,
          content: message.content,
          senderId: message.sender[0],
          reciverId: message.reciver[0],
        };
      });
      return result;
    } catch (error) {
      return [];
    }
  }
}
