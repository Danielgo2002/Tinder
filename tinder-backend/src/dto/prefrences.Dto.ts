import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ageRange, gender, location } from 'src/Schemas/Enums';

export class preferencesDto {
  @IsEnum(gender)
  gender: gender;

  // @IsEnum(ageRange)
  @IsNumber()
  age: number;

  @IsEnum(location)
  location: location;

  @IsString()
  id: string;
}
