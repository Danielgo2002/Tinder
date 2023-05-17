import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDocument } from 'src/Schemas/userSchema';

@Injectable()
export class RefStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectModel('users') private readonly UserModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_REFRESH'),
    });
  }

  async validate(payload: { sub: number; gmail: string }) {
    const result = await this.UserModel.findById(payload.sub);
    const user = result;
    if (user.hash) delete user.hash;
    return user;
  }
}
