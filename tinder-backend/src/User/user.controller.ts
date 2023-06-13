import { Body, Controller, Get, Post ,Request, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AUthGuard } from 'src/Auth/auth.guard';
import { likesDto } from 'src/dto/likes.Dto';
import { storage,  } from 'src/utils/upload.service';
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
