import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type DislikeDocument = Dislike & Document;
@Schema()
export class Dislike {




  @Prop()
  date: number;

}

export const DislikeSchema = SchemaFactory.createForClass(Dislike);
