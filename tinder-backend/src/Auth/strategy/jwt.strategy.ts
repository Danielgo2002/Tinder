import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDocument, User } from 'src/Schemas/userSchema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectModel('User') private readonly UserModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: { sub: string; gmail: string }) {
    const result = await this.UserModel.findById(payload.sub);
    const user = result;
    if (user.hash) delete user.hash;
    return user;
  }
  // async validate(payload: { sub: string; gmail: string }) {
  //   const result = await this.UserModel.findById(payload.gmail);
  //   const user = result;
  //   if (user && user.hash) delete user.hash;
  //   return user;
  // }
}
