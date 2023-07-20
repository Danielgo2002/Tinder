import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { type } from 'os';
import { Chat } from './chatSchema';
import { Dislike } from './dislikeSchema';
import { ageRange, gender, location } from './Enums';

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
  chat: Chat[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likes: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likesRecived: Types.ObjectId[];

  // @Prop({type: [{type: Types.ObjectId ,ref: 'User'}] })
  // dislikes: Dislike[];

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

  //  @Prop()
  // sendLikesCount: number;

  // @Prop()
  // receiveLikesCount: number;
  @Prop({
    type: Object,
    default: {
      gender: null,
      MinAge: null,
      MaxAge:null,
      location: null,
      id: null,
    },
  })
  preferences: {
    gender: gender;
    MinAge: number;
    MaxAge:number
    location: location;
    id: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
