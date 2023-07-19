import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schemas/userSchema';

@Module({
  imports:  [  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],

  providers: [MessagesGateway, MessagesService]
})
export class MessagesModule {}
