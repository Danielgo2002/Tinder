import { Body, Controller, Post } from '@nestjs/common';
import { likesDto } from 'src/dto/likes.Dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('likes')
  likes(@Body() likesDto: likesDto) {
    return this.UserService.likes(likesDto);
  }
}
