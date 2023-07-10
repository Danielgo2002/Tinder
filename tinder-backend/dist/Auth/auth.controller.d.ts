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
            MinAge: number;
            MaxAge: number;
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
