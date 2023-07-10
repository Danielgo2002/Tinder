import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { count } from 'console';
import { Model } from 'mongoose';
import { statusCode } from 'src/constants';
import { disLikesDto } from 'src/dto/disLike.dto';
import { likesDto } from 'src/dto/likes.Dto';
import { UserDocument } from 'src/Schemas/userSchema';
import { ObjectId } from 'mongodb';
import { Dislike } from 'src/Schemas/dislikeSchema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<UserDocument>,
  ) {}

  async getUsers(idUser: string) {
    try {
      const users = await this.UserModel.find({ _id: { $ne: idUser } });

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

      // const dislikeusers = likedUsers.filter((user) =>
      //   myUser.dislikes.includes(user._id),
      // );

      // const myOutDatedDislikes = myUser.dislikes.filter((disLike) => {
      //   const date = new Date(disLike.date);
      //   const twentyFourHoursAgo = new Date();
      //   twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24); // subtract 24 hours
      //   if (date < twentyFourHoursAgo) return disLike;
      // });
      const outDatedUsers = myUser.dislikes.filter((dislike) => {
        const dateEnd = new Date(dislike.date);
        const currentDate = new Date();
        if (dateEnd <= currentDate) {
          return dislike;
        }
      });

      const outDatedUsersIds = outDatedUsers.map((user) => user._id);

      // if (outDatedUsers.length == 0) {
      // console.log(outDatedUsers);

      const dislikes = myUser.dislikes.map((user) => user._id);
      //console.log(likedUsers);

      let usersfilterd = likedUsers.filter((user) => {
        if (dislikes.includes(user.id) && !outDatedUsersIds.includes(user.id)) {
          return null;
        }
        return user;
        // if (
        //   dislikes.includes(user._id) &&
        //   outDatedUsersIds.includes(user._id)
        // ) {
        //   ;

        //   return user;
        // }

        // if (!dislikes.includes(user._id)) {

        //   return user;
        // }

        //check if in the myUser.dislike
        //check if in the myOutDatedDislikes
        //if both return user
        //if none of them also return user
      });

      // console.log(likedUsers.length);

      // }

      console.log(usersfilterd);

      const UpdatedUsers = usersfilterd.map((element) => {
        let count = 0;
        if (
          element.age >= pref?.MinAge &&
          element.age <= pref?.MaxAge &&
          element.location === pref?.location
        ) {
          count = 2;
        } else if (
          (element.age >= pref?.MinAge && element.age <= pref?.MaxAge) ||
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

      if (!pref)
        return {
          data: users,
          message: 'pass',
          status: statusCode.success,
        };

      return {
        data: sortedUsers,
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

  async getMyUser(userId: string) {
    try {
      const myUser = await this.UserModel.findById(userId);

      return myUser;
    } catch (error) {
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

  async disLikes(ownerId: string, disLikesDto: disLikesDto) {
    try {
      const User = await this.UserModel.findById(ownerId);
      const recivedUser = await this.UserModel.findById(disLikesDto.reciverID);
      let dateEnd = new Date();
      dateEnd.setHours(dateEnd.getHours() + 24);
      const date = dateEnd.valueOf(); // subtract 24 hours

      // const dislikes = {
      //   _id: recivedUser._id,
      //   date: date,
      // };

      const usersId = User.dislikes.map((user) => user._id);

      if (usersId.includes(recivedUser.id)) {
        const index = User.dislikes.findIndex(
          (item) => item._id === recivedUser.id,
        );
        const d = new Date();
        User.dislikes[index] = { _id: recivedUser.id, date: d.valueOf() };
      } else {
        User.dislikes.push({ _id: recivedUser.id, date });
      }

      await User.save();
      return {
        data: User,
        status: statusCode.success,
        message: 'dislike added',
      };
    } catch (error: any) {
      return {
        data: undefined,
        status: statusCode.error,
        message: 'there is an error',
      };
    }
  }
}
