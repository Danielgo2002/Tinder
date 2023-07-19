import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from 'src/Schemas/chatSchema';
import { User, UserSchema } from 'src/Schemas/userSchema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    JwtModule.register({}),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
