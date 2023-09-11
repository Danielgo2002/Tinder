import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { gender, location } from 'src/Schemas/Enums';

export class editUserDto {
  @IsNotEmpty()
  @IsString()
  first_Name: string;

  @IsNotEmpty()
  @IsString()
  last_Name: string;

  @IsNotEmpty()
  age: number;

  @IsEnum(gender)
  gender: gender;

  @IsEnum(location)
  location: location;

  @IsString()
  summery: string;
}
