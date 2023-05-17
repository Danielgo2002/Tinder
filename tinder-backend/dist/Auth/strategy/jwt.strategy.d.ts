import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { UserDocument, User } from 'src/Schemas/userSchema';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly UserModel;
    constructor(config: ConfigService, UserModel: Model<UserDocument>);
    validate(payload: {
        sub: number;
        gmail: string;
    }): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
export {};
