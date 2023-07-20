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
import * as argon from 'argon2';
import axios from 'axios';
import { faker } from '@faker-js/faker';

@Injectable()
export class AuthService {
  create(imageData: {
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
  }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel('User') private readonly UserModel: Model<UserDocument>,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signUp(signUpDto: signUpDto, file: Express.Multer.File) {
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

      const hash = await argon.hash(signUpDto.password);
      delete signUpDto.password;
      const newobj = { ...signUpDto, ...{ hash } };

      const User = new this.UserModel(newobj);

      if (file) {
        User.image = file.filename;
      }
      User.image = file.filename;

      await User.save();

      const access_Token = await (
        await this.accessToken(User.id, User.gmail)
      ).access_token;

      const refresh_token = await (
        await this.refreshToken(User.id, User.gmail)
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

    const pwMatches = await argon.verify(User.hash, signInDto.password); // checks if the password entered matches with the matching user
    if (!pwMatches)
      return {
        data: undefined,
        status: statusCode.error,
        message: 'משתמש לא נמצא נסה שנית',
      };

    const access_Token = (await this.accessToken(User.id, User.gmail))
      .access_token;
    const refresh_token = (await this.refreshToken(User.id, User.gmail))
      .refresh_token;
    return { access_Token, refresh_token, User };
  }
  async addPreferences(preferencesDto: preferencesDto, userId: string) {
    const findUser = await this.UserModel.findById(userId);
    const preferences = {
      gender: preferencesDto.gender,
      MinAge: preferencesDto.MinAge,
      MaxAge: preferencesDto.MaxAge,
      location: preferencesDto.location,
      id: userId,
    };

    findUser.preferences = preferences;

    await findUser.save();
    return {
      data: preferences,
      status: statusCode.success,
      message: 'העדפות חדשות נכנסו למערכת...',
    };
  }

  async accessToken(
    id: string,
    gmail: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: id,
      gmail,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
  async refreshToken(
    id: string,
    gmail: string,
  ): Promise<{ refresh_token: string }> {
    const payload = {
      sub: id,
      gmail,
    };
    const secret = this.config.get('JWT_SECRET_REFRESH');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: secret,
    });
    return { refresh_token: token };
  }
  async refresh(user) {
    const access_Token = await this.accessToken(user.id, user.gmail);
    return access_Token;
  }

  async createUsers() {
    const hash = await argon.hash('123456');

    for (let index = 0; index < 10; index++) {
      const first_Name = faker.person.firstName(); // Rowan Nikolaus
      const last_Name = faker.person.lastName(); // Rowan Nikolaus
      const gmail = faker.internet.email(); // Kassandra.Haley@erich.biz

      const gender = faker.person.sex();

      const summery = faker.person.bio();

      const image = faker.image.avatarLegacy();
      const age = Math.floor(Math.random() * (70 - 18 + 1) + 18);
      const location =
        index % 3 === 0 ? 'center' : index % 2 === 0 ? 'north' : 'south';
      const User = new this.UserModel({
        first_Name,
        last_Name,
        gmail,
        hash,
        summery,
        gender,
        location,
        image,
        age,
      });
      await User.save();
    }

    return 'success';
  }
}
