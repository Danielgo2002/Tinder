import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { statusCode } from 'src/constants';
import { signUpDto } from 'src/dto/signUp.Dto';
import { User, UserDocument } from 'src/Schemas/userSchema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { signInDto } from 'src/dto/signIn.Dto';
import { preferencesDto } from 'src/dto/prefrences.Dto';
import { deleteDto } from 'src/dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<UserDocument>,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signUp(signUpDto: signUpDto) {
    try {
      const exsistUser = await this.UserModel.findOne({
        gmail: signUpDto.gmail,
      });
      if (exsistUser) {
        return {
          data: undefined,
          status: statusCode.error,
          message: 'duplicate error. this email alredy taken...',
        };
      }

      const newobj = { ...{ hash: 'hasj', ...signUpDto } };
      delete newobj.password;
      const User = new this.UserModel(signUpDto);
      await User.save();

      const access_Token = await (
        await this.accessToken(User.gmail)
      ).access_token;

      const refresh_token = await (
        await this.refreshToken(User.gmail)
      ).refresh_token;

      return {
        access_Token,
        refresh_token,
        data: User,
        status: statusCode.success,
        message: 'משתמש נוצר בהצלחה',
      };
    } catch (error: any) {
      return {
        data: undefined,
        status: statusCode.error,
        message: 'קרתה בעיה ביצירת משתמש',
      };
    }
  }

  async signIn(signInDto: signInDto) {
    const User = await this.UserModel.findOne({ gmail: signInDto.gmail });
    if (!User) {
      return {
        data: undefined,
        status: statusCode.error,
        message: 'משתמש לא נמצא נסה שנית',
      };
    }
    const access_Token = await (
      await this.accessToken(User.gmail)
    ).access_token;
    const refresh_token = await (
      await this.refreshToken(User.gmail)
    ).refresh_token;
    return { access_Token, refresh_token, User };
  }
  // async addPreferences(preferencesDto: preferencesDto) {
  //   const findUser = await this.UserModel.findById(preferencesDto.id);
  //   const preferences = {
  //     gender: preferencesDto.gender,
  //     age: preferencesDto.age,
  //     location: preferencesDto.location,
  //   };
  //   findUser.preferences = preferences;
  //   await findUser.save();
  //   return {
  //     data: preferences,
  //     status: statusCode.success,
  //     message: 'העדפות חדשות נכנסו למערכת...',
  //   };
  // }

  async accessToken(gmail: string): Promise<{ access_token: string }> {
    const payload = {
      sub: gmail,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
  async refreshToken(gmail: string): Promise<{ refresh_token: string }> {
    const payload = {
      sub: gmail,
    };
    const secret = this.config.get('JWT_SECRET_REFRESH');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return { refresh_token: token };
  }
  async refresh(user) {
    const access_Token = await this.accessToken(user.email);
    return access_Token;
  }
}
