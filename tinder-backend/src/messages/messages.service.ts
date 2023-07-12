import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/Schemas/userSchema';
import { messageDto } from './dto/message.Dto';
import { Messagess } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages : Messagess[] = [{name : 'Marius' , text : 'heyoo'}]
  clientToUser = {}

  identify(name: string, clientId: string){
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser)
  }
  // constructor(
  //   @InjectModel('User') private readonly UserModel: Model<UserDocument>,
  // ){}
getClientName(clientId :string){
  return this.clientToUser[clientId]
}

  create(messageDto: messageDto) {
    const message = {...messageDto}
    this.messages.push(message)
    return message
  }

  async findAll() {
    // const User = await this.UserModel.findById(userId)

    return this.messages;
  }

  
}
