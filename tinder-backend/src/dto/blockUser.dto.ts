import { IsString } from 'class-validator';

export class blockUserDto {
  @IsString()
  blockedUserId: string;
}
