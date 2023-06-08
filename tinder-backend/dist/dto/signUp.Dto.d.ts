/// <reference types="multer" />
import { gender, location } from 'src/Schemas/Enums';
export declare class signUpDto {
    gmail: string;
    password: string;
    first_Name: string;
    last_Name: string;
    age: number;
    gender: gender;
    image: Express.Multer.File;
    location: location;
    summery: string;
}
