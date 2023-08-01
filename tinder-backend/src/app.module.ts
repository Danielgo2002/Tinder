import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { MessagesModule } from './messages/messages.module';
import { NotificationService } from './notification/notification.service';
import { NotificationController } from './notification/notification.controller';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/static',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost/tinder'),
    AuthModule,
    UserModule,
    MulterModule.register({ dest: './uploads' }),
    MessagesModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
