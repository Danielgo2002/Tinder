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

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('signUp')
  @UseInterceptors(
    FileInterceptor('image', {
      dest: './uploads',
      
    }),
  )
  async signUp(
    @Body() signUpDto: signUpDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    signUpDto.image = image
    console.log(typeof(image));

    return this.AuthService.signUp(signUpDto,image);
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
}
