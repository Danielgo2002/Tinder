import { disLikesDto } from 'src/dto/disLike.dto';
import { likesDto } from 'src/dto/likes.Dto';
import { UserService } from './user.service';
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
}
