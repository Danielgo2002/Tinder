import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { location } from 'src/Schemas/Enums';

export class signUpDto {
  @IsNotEmpty()
  @IsEmail()
  gmail: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  first_Name: string;

  @IsNotEmpty()
  @IsString()
  last_Name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsString()
  gender: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(location)
  location: location;

  @IsString()
  summery: string;
}
