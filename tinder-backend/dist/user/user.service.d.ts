import { Model } from 'mongoose';
import { likesDto } from 'src/dto/likes.Dto';
import { UserDocument } from 'src/Schemas/userSchema';
export declare class UserService {
    private readonly UserModel;
    constructor(UserModel: Model<UserDocument>);
    getUsers(idUser: string): Promise<{
        data: (import("src/Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        message: string;
        status: string;
    }>;
    likes(likesDto: likesDto): Promise<{
        data: import("src/Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        status: string;
        match: boolean;
        message: string;
    }>;
}
