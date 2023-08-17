import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AUthGuard } from 'src/Auth/auth.guard';
import { blockUserDto } from 'src/dto/blockUser.dto';
import { disLikesDto } from 'src/dto/disLike.dto';
import { likesDto } from 'src/dto/likes.Dto';
import { UnBlockUserDto } from 'src/dto/unBlockUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @UseGuards(AUthGuard)
  @Post('likes')
  likes(@Request() req, @Body() likesDto: likesDto) {
    return this.UserService.likes(req.user.sub, likesDto);
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
  @UseGuards(AUthGuard)
  @Post('blockUser')
  blockUser(@Request() req, @Body() blockUserdto: blockUserDto) {
    return this.UserService.blockUser(req.user.sub, blockUserdto);
  }
  @UseGuards(AUthGuard)
  @Post('UnBlockUser')
  UnBlockUser(@Request() req, @Body() UnblockUserdto: UnBlockUserDto) {
    return this.UserService.UnBlockUser(req.user.sub, UnblockUserdto);
  }
}
