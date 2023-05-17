import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ageRange, gender, location } from 'src/Schemas/Enums';
import { User } from 'src/Schemas/userSchema';

export class likesDto {
  @IsNotEmpty()
  ownerID: string;

  @IsNotEmpty()
  reciverID: string;
}
