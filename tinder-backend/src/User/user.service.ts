import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { count } from 'console';
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

  async getFilterUsers(userId: string) {
    try {
      const myUser = await this.UserModel.findById(userId);
      const pref = myUser.preferences;

      const users = await this.UserModel.find({
        _id: { $ne: userId },
        gender: pref ? pref.gender : {},
      });
      const likedUsers = users.filter(
        (user) => !user.likesRecived.includes(myUser.id),
      );

      // const updateUsers = users.map((element) => ({
      //   ...element,
      //   count: 0,
      // }));

      const UpdatedUsers = likedUsers.map((element) => {
        // console.log({ ...element });

        let count = 0;
        if (element.age === pref?.age && element.location === pref?.location) {
          count = 2;
        } else if (
          element.age === pref?.age ||
          element.location === pref?.location
        ) {
          count = 1;
        }

        return {
          ...element.toObject(),
          count: count,
        };
      });

      const sortedUsers = UpdatedUsers.sort((a, b) => b.count - a.count);

      // console.log('sortedusers', sortedUsers);

      if (!pref)
        return {
          data: users,
          message: 'pass',
          status: statusCode.success,
        };

      // console.log(userslike);
      console.log(sortedUsers);

      return {
        data: sortedUsers,
        message: 'pass',
        status: statusCode.success,
      };
    } catch (error) {
      console.log(error);

      return {
        data: [],
        message: 'לא נמצאו משתמשים',
        status: statusCode.error,
      };
    }
  }

  async getMyUser(userId: string) {
    try {
      const myUser = await this.UserModel.findById(userId);

      return myUser;
    } catch (error) {
      console.log(error);

      return {
        data: [],
        message: 'לא נמצאו משתמשים',
        status: statusCode.error,
      };
    }
  }

  async likes(ownerId: string, likesDto: likesDto) {
    try {
      const user = await this.UserModel.findById(ownerId);
      const recivedUser = await this.UserModel.findById(likesDto.reciverID);

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
