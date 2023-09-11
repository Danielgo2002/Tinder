import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Request,
  UseGuards,
  Get,
  UseInterceptors,
  UploadedFile,
  
} from '@nestjs/common';
import {
  FileInterceptor,
} from '@nestjs/platform-express';
import {  preferencesDto, signInDto, signUpDto } from 'src/dto';
import { AUthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { JwtRefreshTokenGuard } from './strategy/RefreshToken.guard';
import { storage } from 'src/utils/upload.service';

/**
 * @description here i create the authentiocation routes each route get the params 
 */

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('signUp')
  @UseInterceptors(FileInterceptor('file', storage))
  async signUp(@Body() signUpDto: signUpDto, @UploadedFile() file) {
    return this.AuthService.signUp(signUpDto, file);
  }

  @Post('signIn')
  signIn(@Body() signInDto: signInDto) {
    return this.AuthService.signIn(signInDto);
  }

  @UseGuards(AUthGuard)
  @Post('addPreferences')
  addPreferences(@Request() req, @Body() preferencesDto: preferencesDto) {
    return this.AuthService.addPreferences(preferencesDto, req.user.sub);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Get('refresh')
  refresh(@Request() req) {
    return this.AuthService.refresh(req.user);
  }
  @Get('createUsers')
  createUsers() {
    return this.AuthService.createUsers();
  }
}
