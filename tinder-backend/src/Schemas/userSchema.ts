import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Chat } from './chatSchema';
import { gender, location } from './Enums';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  gmail: string;

  @Prop()
  hash: string;

  @Prop()
  first_Name: string;

  @Prop()
  last_Name: string;

  @Prop()
  age: number;

  @Prop()
  gender: gender;

  @Prop()
  location: location;

  @Prop()
  summery: string;

  @Prop()
  image: string;

  @Prop()
  socketId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Chat' }] })
  chats: Chat[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likes: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likesRecived: Types.ObjectId[];

  @Prop([
    {
      type: Object,
      default: {
        _id: null,
        date: null,
      },
    },
  ])
  dislikes: [
    {
      _id: string;
      date: number;
    },
  ];

  @Prop({
    type: Object,
    default: {
      gender: null,
      MinAge: null,
      MaxAge: null,
      location: null,
      id: null,
    },
  })
  preferences: {
    gender: gender;
    MinAge: number;
    MaxAge: number;
    location: location;
    id: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
