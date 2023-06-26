import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AUthGuard } from 'src/Auth/auth.guard';
import { likesDto } from 'src/dto/likes.Dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
  @UseGuards(AUthGuard)
  @Post('likes')
  likes(@Request() req, @Body() likesDto: likesDto) {
    console.log(req);

    return this.UserService.likes(req.user.sub, likesDto);
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



}
