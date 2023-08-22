import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { statusCode } from 'src/constants';
import { blockUserDto } from 'src/dto/blockUser.dto';
import { disLikesDto } from 'src/dto/disLike.dto';
import { likesDto } from 'src/dto/likes.Dto';
import { UnBlockUserDto } from 'src/dto/unBlockUser.dto';
import { ChatDocument } from 'src/Schemas/chatSchema';
import { NotificationDocument } from 'src/Schemas/notificationSchema';
import { UserDocument } from 'src/Schemas/userSchema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<UserDocument>,
    @InjectModel('Chat') private readonly ChatModel: Model<ChatDocument>,
    @InjectModel('Notification')
    private readonly NotificationModel: Model<NotificationDocument>,
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

      const outDatedUsers = myUser.dislikes.filter((dislike) => {
        const dateEnd = new Date(dislike.date);
        const currentDate = new Date();
        if (dateEnd <= currentDate) {
          return dislike;
        }
      });

      const outDatedUsersIds = outDatedUsers.map((user) => user._id);

      const dislikes = myUser.dislikes.map((user) => user._id);

      let usersfilterd = likedUsers.filter((user) => {
        if (dislikes.includes(user.id) && !outDatedUsersIds.includes(user.id)) {
          user = null;
          return user;
        }
        return user;
      });

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
      const myUser = await this.UserModel.findById(userId).populate(
        'notifications',
      );

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

      const match =
        recivedUser.likes.includes(user._id) &&
        user.likes.includes(recivedUser.id);
      if (match) {
        const notification = await this.NotificationModel.create({
          user: recivedUser,
          content: `You got a new match with ${user.first_Name}`,
          date: new Date().valueOf(),
        });
        const chat = await this.ChatModel.create({
          messages: [],
          blockedUser: '',
          participants: [recivedUser._id, user._id],
        });
        recivedUser.notifications.push(notification._id);
        user.chats.push(chat);
        recivedUser.chats.push(chat);

        await chat.save();
        await notification.save();
      }
      await user.save();
      await recivedUser.save();

      return {
        data: user,
        status: statusCode.success,
        match,
        message: `${
          match ? `You got a new match with ${recivedUser.first_Name}` : 'wa'
        }`,
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

  async getChatUsers(userId: string) {
    try {
      const myUser = await this.UserModel.findById(userId);
      const users = await this.UserModel.find({
        _id: { $ne: userId },
      }).populate('chats');

      const chats = await this.ChatModel.find({
        participants: { $all: [myUser._id] },
      })
        .populate('messages')
        .populate('participants')
        .exec();

      const dateOfLastMessageInChat = chats.map((chat) => {
        const message = chat.messages[chat.messages.length - 1];

        const user = chat.participants.find((user) => {
          const id = (user as any)._id.toString();

          if (id !== myUser._id) {
            return user;
          }
        });
        if (message) {
          return { lastMessageDate: message.date, user };
        } else {
          return { lastMessageDate: -1, user };
        }
      });

      const sorted = dateOfLastMessageInChat.sort(
        (a, b) => b.lastMessageDate - a.lastMessageDate,
      );

      // const usersiLiked = users.filter(
      //   (user) =>
      //     user.likesRecived.includes(myUser.id) &&
      //     myUser.likesRecived.includes(user.id),
      // );
      // console.log(usersiLiked);
      // const result = usersiLiked.filter((user) => user._id != myUser._id);
      console.log(sorted);

      return {
        data: sorted,
        message: 'pass',
        status: statusCode.success,
      };
    } catch (error: any) {
      return {
        data: [],
        message: 'לא נמצאו משתמשים',
        status: statusCode.error,
      };
    }
  }

  async blockUser(ownerId: string, blockedUserdto: blockUserDto) {
    try {
      const myUser = await this.UserModel.findById(ownerId);
      const recivedUser = await this.UserModel.findById(
        blockedUserdto.blockedUserId,
      );
      const chat = await this.ChatModel.findOne({
        participants: { $all: [myUser._id, recivedUser._id] },
      });

      if (chat) {
        chat.blockedUser = recivedUser._id;
        await chat.save();
      }

      return {
        data: recivedUser,
        blocked: true,
        status: statusCode.success,
        message: 'user blocked',
      };
    } catch {
      return {
        data: undefined,
        blocked: false,
        status: statusCode.error,
        message: 'error while blocking user',
      };
    }
  }
  async UnBlockUser(ownerId: string, UnblockUserdto: UnBlockUserDto) {
    try {
      const myUser = await this.UserModel.findById(ownerId);
      const recivedUser = await this.UserModel.findById(
        UnblockUserdto.UnblockedUserId,
      );
      const chat = await this.ChatModel.findOne({
        participants: { $all: [myUser._id, recivedUser._id] },
      });

      if (chat) {
        chat.blockedUser = '';
        await chat.save();
      }

      return {
        data: recivedUser,
        blocked: true,
        status: statusCode.success,
        message: 'user blocked',
      };
    } catch {
      return {
        data: undefined,
        blocked: false,
        status: statusCode.error,
        message: 'error while blocking user',
      };
    }
  }
}
