import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AUthGuard } from 'src/Auth/auth.guard';
import { disLikesDto } from 'src/dto/disLike.dto';
import { likesDto } from 'src/dto/likes.Dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @UseGuards(AUthGuard)
  @Post('likes')
  likes(@Request() req , @Body() likesDto: likesDto,) {
    return this.UserService.likes(req.user.sub, likesDto, );
  }
  @UseGuards(AUthGuard)
  @Post('dislikes')
  disLikes(@Request() req, @Body() disLikesDto: disLikesDto) {
    return this.UserService.disLikes(req.user.sub, disLikesDto);
  }
  @UseGuards(AUthGuard)
  @Get('getUsers')
  getUsers(@Request() req) {
    return this.UserService.getUsers(req.user.sub);
  }

  @UseGuards(AUthGuard)
  @Get('getFilterUsers')
  getFilterUsers(@Request() req) {
    return this.UserService.getFilterUsers(req.user.sub);
  }
  @UseGuards(AUthGuard)
  @Get('getMyUser')
  getMyUser(@Request() req) {
    return this.UserService.getMyUser(req.user.sub);
  }
  @UseGuards(AUthGuard)
  @Get('getChatUsers')
  getChatUsers(@Request() req) {
    return this.UserService.getChatUsers(req.user.sub);
  }
}
