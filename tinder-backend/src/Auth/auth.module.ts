// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from 'src/Schemas/userSchema';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { JwtStrategy } from './strategy';
// import { RefStrategy } from './strategy/refStrategy';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     JwtModule.register({}),

//     MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, ConfigService, JwtStrategy, RefStrategy],
// })
// export class AuthModule {}
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schemas/userSchema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy, RefStrategy } from './strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy, RefStrategy],
})
export class AuthModule {}
