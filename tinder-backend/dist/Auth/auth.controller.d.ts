import { preferencesDto, signInDto, signUpDto } from 'src/dto';
import { UserDocument } from 'src/Schemas/userSchema';
import { AuthService } from './auth.service';
export declare class AuthController {
    private AuthService;
    constructor(AuthService: AuthService);
    signUp(signUpDto: signUpDto, file: any): Promise<{
        data: any;
        status: string;
        message: string;
        access_Token?: undefined;
        refresh_token?: undefined;
    } | {
        access_Token: string;
        refresh_token: string;
        data: import("src/Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        status: string;
        message: string;
    }>;
    signIn(signInDto: signInDto): Promise<{
        data: any;
        status: string;
        message: string;
        access_Token?: undefined;
        refresh_token?: undefined;
        User?: undefined;
    } | {
        access_Token: string;
        refresh_token: string;
        User: import("src/Schemas/userSchema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        data?: undefined;
        status?: undefined;
        message?: undefined;
    }>;
    addPreferences(req: any, preferencesDto: preferencesDto): Promise<{
        data: {
            gender: import("../Schemas/Enums").gender;
            age: number;
            location: import("../Schemas/Enums").location;
            id: string;
        };
        status: string;
        message: string;
    }>;
    refresh(account: UserDocument): Promise<{
        access_token: string;
    }>;
    createUsers(): Promise<string>;
}
