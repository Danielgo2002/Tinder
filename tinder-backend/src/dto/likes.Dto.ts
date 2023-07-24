import {  IsNotEmpty} from 'class-validator';

export class likesDto {
 

  @IsNotEmpty()
  reciverID: string;
}
