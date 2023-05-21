import { Model } from 'mongoose';
import { signUpDto } from 'src/dto/signUp.Dto';
import { User, UserDocument } from 'src/Schemas/userSchema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { signInDto } from 'src/dto/signIn.Dto';
import { preferencesDto } from 'src/dto/prefrences.Dto';
export declare class AuthService {
    private readonly UserModel;
    private config;
    private jwt;
    constructor(UserModel: Model<UserDocument>, config: ConfigService, jwt: JwtService);
    signUp(signUpDto: signUpDto): Promise<{
        data: any;
        status: string;
        message: string;
        access_Token?: undefined;
        refresh_token?: undefined;
    } | {
        access_Token: string;
        refresh_token: string;
        data: User & import("mongoose").Document<any, any, any> & {
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
        User: User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        data?: undefined;
        status?: undefined;
        message?: undefined;
    }>;
    addPreferences(preferencesDto: preferencesDto): Promise<{
        data: {
            gender: import("../Schemas/Enums").gender;
            age: number;
            location: import("../Schemas/Enums").location;
            id: string;
        };
        status: string;
        message: string;
    }>;
    accessToken(id: string, gmail: string): Promise<{
        access_token: string;
    }>;
    refreshToken(id: string, gmail: string): Promise<{
        refresh_token: string;
    }>;
    refresh(user: any): Promise<{
        access_token: string;
    }>;
}
