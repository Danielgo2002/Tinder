import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { deleteDto, preferencesDto, signInDto, signUpDto } from 'src/dto';
import { UserDocument } from 'src/Schemas/userSchema';
import { AuthService } from './auth.service';
import { GetUser } from './decorators';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('signUp')
  signUp(@Body() signUpDto: signUpDto) {
    return this.AuthService.signUp(signUpDto);
  }

  @Post('signIn')
  signIn(@Body() signInDto: signInDto) {
    return this.AuthService.signIn(signInDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('addPreferences')
  addPreferences(@Body() preferencesDto: preferencesDto) {
    return this.AuthService.addPreferences(preferencesDto);
  }

  // @Get('refresh')
  // refresh(@GetUser() account: UserDocument) {
  //   return this.AuthService.refresh(account);
  // }
}
