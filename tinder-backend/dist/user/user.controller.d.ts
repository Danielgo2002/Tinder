/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { blockUserDto } from 'src/dto/blockUser.dto';
import { disLikesDto } from 'src/dto/disLike.dto';
import { likesDto } from 'src/dto/likes.Dto';
import { UnBlockUserDto } from 'src/dto/unBlockUser.dto';
import { UserService } from './user.service';
import { editUserDto } from 'src/dto/editUser.dto';
export declare class UserController {
    private UserService;
    constructor(UserService: UserService);
    likes(req: any, likesDto: likesDto): Promise<{
        data: import("../Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        status: string;
        match: boolean;
        message: string;
    }>;
    disLikes(req: any, disLikesDto: disLikesDto): Promise<{
        data: import("../Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        status: string;
        message: string;
    }>;
    getUsers(req: any): Promise<{
        data: (import("../Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        message: string;
        status: string;
    }>;
    getFilterUsers(req: any): Promise<{
        data: (import("../Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
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
    getMyUser(req: any): Promise<(import("../Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | {
        data: any[];
        message: string;
        status: string;
    }>;
    getChatUsers(req: any): Promise<{
        data: ({
            lastMessageDate: number;
            user: import("../Schemas/userSchema").User;
        } | {
            user: import("../Schemas/userSchema").User;
            lastMessageDate?: undefined;
        })[];
        message: string;
        status: string;
    }>;
    blockUser(req: any, blockUserdto: blockUserDto): Promise<{
        data: import("../Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        blocked: boolean;
        status: string;
        message: string;
    }>;
    UnBlockUser(req: any, UnblockUserdto: UnBlockUserDto): Promise<{
        data: import("../Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        blocked: boolean;
        status: string;
        message: string;
    }>;
    editUser(req: any, editUserDto: editUserDto, file: any): Promise<{
        data: import("../Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        status: string;
        message: string;
    }>;
}
