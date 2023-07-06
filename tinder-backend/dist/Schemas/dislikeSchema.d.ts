import mongoose from "mongoose";
export type DislikeDocument = Dislike & Document;
export declare class Dislike {
    date: number;
}
export declare const DislikeSchema: mongoose.Schema<Dislike, mongoose.Model<Dislike, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Dislike>;
