/// <reference types="multer" />
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
/// <reference types="mongoose/types/inferschematype" />
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
    create(imageData: {
        filename: string;
        originalname: string;
        mimetype: string;
        size: number;
    }): void;
    constructor(UserModel: Model<UserDocument>, config: ConfigService, jwt: JwtService);
    signUp(signUpDto: signUpDto, file: Express.Multer.File): Promise<{
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
    addPreferences(preferencesDto: preferencesDto, userId: string): Promise<{
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
    accessToken(id: string, gmail: string): Promise<{
        access_token: string;
    }>;
    refreshToken(id: string, gmail: string): Promise<{
        refresh_token: string;
    }>;
    refresh(user: any): Promise<{
        access_token: string;
    }>;
    createUsers(): Promise<string>;
}
