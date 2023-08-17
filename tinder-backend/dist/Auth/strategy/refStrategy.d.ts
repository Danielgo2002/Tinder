import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { UserDocument } from 'src/Schemas/userSchema';
declare const RefStrategy_base: new (...args: any[]) => any;
export declare class RefStrategy extends RefStrategy_base {
    private readonly UserModel;
    constructor(UserModel: Model<UserDocument>, config: ConfigService);
    validate(payload: {
        sub: string;
        gmail: string;
    }): Promise<import("src/Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
export {};
