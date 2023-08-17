import { IsString } from 'class-validator';

export class UnBlockUserDto {
  @IsString()
  UnblockedUserId: string;
}
