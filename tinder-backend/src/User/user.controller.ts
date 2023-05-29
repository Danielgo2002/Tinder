import { Body, Controller, Get, Post ,Request, UseGuards} from '@nestjs/common';
import { AUthGuard } from 'src/Auth/auth.guard';
import { likesDto } from 'src/dto/likes.Dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('likes')
  likes(@Body() likesDto: likesDto) {
    return this.UserService.likes(likesDto);
  }
  @UseGuards(AUthGuard)

  @Get('getUsers')
  getUsers(@Request() req){
    return this.UserService.getUsers(req.user.sub)

  }
}
