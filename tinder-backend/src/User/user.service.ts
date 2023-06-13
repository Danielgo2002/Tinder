import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { statusCode } from 'src/constants';
import { likesDto } from 'src/dto/likes.Dto';
import { UserDocument } from 'src/Schemas/userSchema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<UserDocument>,
  ) {}

  async getUsers(idUser: string) {
    try {
      console.log(idUser);

      const users = await this.UserModel.find({ _id: { $ne: idUser } });
      console.log(users);

      return {
        data: users,
        message: 'pass',
        status: statusCode.success,
      };
    } catch (error) {
      return {
        data: [],
        message: 'לא נמצאו משתמשים',
        status: statusCode.error,
      };
    }
  }
  async likes(likesDto: likesDto) {
    try {
      const user = await this.UserModel.findById(likesDto.ownerID);
      const recivedUser = await this.UserModel.findById(likesDto.reciverID);
      const yossi = await this.UserModel.findById(likesDto.reciverID);
      console.log(yossi);

      if (user.likes.includes(recivedUser._id)) {
        return {
          data: undefined,
          status: statusCode.warning,
          match: false,
          message: `לא ניתן לעשות לייק מספר פעמים לאותו משתמש`,
        };
      }

      user.likes.push(recivedUser._id);
      recivedUser.likesRecived.push(user._id);

      const match = recivedUser.likes.includes(user._id);
      if (match) {
        user.chat.push(recivedUser._id);
        recivedUser.chat.push(user._id);
      }
      await user.save();
      await recivedUser.save();

      return {
        data: user,
        status: statusCode.success,
        match,
        message: `${likesDto.reciverID}לייק נוסף בהצלחה משתמש:`,
      };
    } catch (error: any) {
      return {
        data: undefined,
        status: statusCode.error,
        match: false,

        message: 'יש בעיה! לא ניתן להשלים את הפעולה',
      };
    }
  }

  
}
