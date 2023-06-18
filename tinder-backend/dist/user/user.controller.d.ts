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
    getUsers(req: any): Promise<{
        data: (import("../Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        message: string;
        status: string;
    }>;
}
