/// <reference types="multer" />
import { Model } from 'mongoose';
import { blockUserDto } from 'src/dto/blockUser.dto';
import { disLikesDto } from 'src/dto/disLike.dto';
import { editUserDto } from 'src/dto/editUser.dto';
import { likesDto } from 'src/dto/likes.Dto';
import { UnBlockUserDto } from 'src/dto/unBlockUser.dto';
import { ChatDocument } from 'src/Schemas/chatSchema';
import { NotificationDocument } from 'src/Schemas/notificationSchema';
import { UserDocument } from 'src/Schemas/userSchema';
export declare class UserService {
    private readonly UserModel;
    private readonly ChatModel;
    private readonly NotificationModel;
    constructor(UserModel: Model<UserDocument>, ChatModel: Model<ChatDocument>, NotificationModel: Model<NotificationDocument>);
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
        data: {
            lastMessageDate: number;
            user: import("src/Schemas/userSchema").User;
        }[];
        message: string;
        status: string;
    }>;
    blockUser(ownerId: string, blockedUserdto: blockUserDto): Promise<{
        data: import("src/Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        blocked: boolean;
        status: string;
        message: string;
    }>;
    UnBlockUser(ownerId: string, UnblockUserdto: UnBlockUserDto): Promise<{
        data: import("src/Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        blocked: boolean;
        status: string;
        message: string;
    }>;
    editUser(editUserDto: editUserDto, userId: string, file: Express.Multer.File): Promise<{
        data: import("src/Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        status: string;
        message: string;
    }>;
}
