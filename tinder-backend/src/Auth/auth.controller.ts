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
  UploadedFiles,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { deleteDto, preferencesDto, signInDto, signUpDto } from 'src/dto';
import { UserDocument } from 'src/Schemas/userSchema';
import { AUthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { GetUser } from './decorators';
import { JwtRefreshTokenGuard } from './strategy/RefreshToken.guard';
import { v4 as uuidv4 } from 'uuid';
import { Observable, of } from 'rxjs';
import { storage } from 'src/utils/upload.service';

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
  refresh(@GetUser() account: UserDocument) {
    return this.AuthService.refresh(account);
  }
  @Get('createUsers')
  createUsers() {
    return this.AuthService.createUsers();
  }
}
