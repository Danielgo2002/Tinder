import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class signInDto {
  @IsNotEmpty()
  @IsEmail()
  gmail: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  
}
