import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { statusCode } from 'src/constants';
import { NotificationDocument } from 'src/Schemas/notificationSchema';
import { UserDocument } from 'src/Schemas/userSchema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification')
    private readonly NotificationModel: Model<NotificationDocument>, // @InjectModel('User') private readonly UserModel: Model<UserDocument>,
  ) {}

  async getNotifications(idUser: string) {
    try {
      const notifications = await this.NotificationModel.find({
        user: { _id: idUser },
      });

      return {
        data: notifications,
        message: 'pass',
        status: statusCode.success,
      };
    } catch (error) {
      return {
        data: [],
        message: 'no messages',
        status: statusCode.error,
      };
    }
  }
  async deleteNotification(idUser: string) {
    try {
      console.log('wa');
      const notification = await this.NotificationModel.remove({
        user: idUser,
      });

      await notification.save();

      return {
        data: [],
        message: 'ההודעות נמחקו בהצלחה',
        status: statusCode.success,
      };
    } catch (error) {
      return {
        data: [],
        message: 'קרתה שגיאה',
        status: statusCode.error,
      };
    }
  }
}
