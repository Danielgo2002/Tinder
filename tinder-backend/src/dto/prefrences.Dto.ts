import { IsEnum, IsNumber } from 'class-validator';
import {  gender, location } from 'src/Schemas/Enums';

export class preferencesDto {
  @IsEnum(gender)
  gender: gender;

  @IsNumber()
  MinAge: number;

  @IsNumber()
  MaxAge: number;

  @IsEnum(location)
  location: location;
}
