import { IsNotEmpty } from "class-validator";

export class disLikesDto {
   
  
    @IsNotEmpty()
    reciverID: string;
  }
  