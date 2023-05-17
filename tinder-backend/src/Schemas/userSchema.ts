import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Chat } from './chatSchema';
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
  gender: string;

  @Prop()
  location: string;

  @Prop()
  summery: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Chat' }] })
  chat: Chat[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likes: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likesRecived: Types.ObjectId[];

  // @Prop()
  // sendLikesCount: number;

  // @Prop()
  // receiveLikesCount: number;
  @Prop({
    type: Object,
    default: {
      gender: null,
      age: null,
      location: null,
    },
  })
  preferences: {
    gender: gender;
    age: ageRange;
    location: location;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
