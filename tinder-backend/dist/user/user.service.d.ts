import { Model } from 'mongoose';
import { disLikesDto } from 'src/dto/disLike.dto';
import { likesDto } from 'src/dto/likes.Dto';
import { ChatDocument } from 'src/Schemas/chatSchema';
import { UserDocument } from 'src/Schemas/userSchema';
export declare class UserService {
    private readonly UserModel;
    private readonly ChatModel;
    constructor(UserModel: Model<UserDocument>, ChatModel: Model<ChatDocument>);
    getUsers(idUser: string): Promise<{
        data: (import("src/Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        message: string;
        status: string;
    }>;
    getFilterUsers(userId: string): Promise<{
        data: (import("src/Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        message: string;
        status: string;
    } | {
        data: {
            count: number;
            _id: unknown;
        }[];
        message: string;
        status: string;
    }>;
    getMyUser(userId: string): Promise<(import("src/Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | {
        data: any[];
        message: string;
        status: string;
    }>;
    likes(ownerId: string, likesDto: likesDto): Promise<{
        data: import("src/Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        status: string;
        match: boolean;
        message: string;
    }>;
    disLikes(ownerId: string, disLikesDto: disLikesDto): Promise<{
        data: import("src/Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        status: string;
        message: string;
    }>;
    getChatUsers(userId: string): Promise<{
        data: (import("src/Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        message: string;
        status: string;
    }>;
}
