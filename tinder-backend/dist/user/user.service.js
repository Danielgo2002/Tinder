"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../constants");
let UserService = class UserService {
    constructor(UserModel, ChatModel) {
        this.UserModel = UserModel;
        this.ChatModel = ChatModel;
    }
    async getUsers(idUser) {
        try {
            const users = await this.UserModel.find({ _id: { $ne: idUser } });
            return {
                data: users,
                message: 'pass',
                status: constants_1.statusCode.success,
            };
        }
        catch (error) {
            return {
                data: [],
                message: 'לא נמצאו משתמשים',
                status: constants_1.statusCode.error,
            };
        }
    }
    async getFilterUsers(userId) {
        try {
            const myUser = await this.UserModel.findById(userId);
            const pref = myUser.preferences;
            const users = await this.UserModel.find({
                _id: { $ne: userId },
                gender: pref ? pref.gender : {},
            });
            const likedUsers = users.filter((user) => !user.likesRecived.includes(myUser.id));
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
                if (element.age >= (pref === null || pref === void 0 ? void 0 : pref.MinAge) &&
                    element.age <= (pref === null || pref === void 0 ? void 0 : pref.MaxAge) &&
                    element.location === (pref === null || pref === void 0 ? void 0 : pref.location)) {
                    count = 2;
                }
                else if ((element.age >= (pref === null || pref === void 0 ? void 0 : pref.MinAge) && element.age <= (pref === null || pref === void 0 ? void 0 : pref.MaxAge)) ||
                    element.location === (pref === null || pref === void 0 ? void 0 : pref.location)) {
                    count = 1;
                }
                return Object.assign(Object.assign({}, element.toObject()), { count: count });
            });
            const sortedUsers = UpdatedUsers.sort((a, b) => b.count - a.count);
            if (!pref)
                return {
                    data: users,
                    message: 'pass',
                    status: constants_1.statusCode.success,
                };
            return {
                data: sortedUsers,
                message: 'pass',
                status: constants_1.statusCode.success,
            };
        }
        catch (error) {
            return {
                data: [],
                message: 'לא נמצאו משתמשים',
                status: constants_1.statusCode.error,
            };
        }
    }
    async getMyUser(userId) {
        try {
            const myUser = await this.UserModel.findById(userId);
            return myUser;
        }
        catch (error) {
            return {
                data: [],
                message: 'לא נמצאו משתמשים',
                status: constants_1.statusCode.error,
            };
        }
    }
    async likes(ownerId, likesDto) {
        try {
            const user = await this.UserModel.findById(ownerId);
            const recivedUser = await this.UserModel.findById(likesDto.reciverID);
            if (user.likes.includes(recivedUser._id)) {
                return {
                    data: undefined,
                    status: constants_1.statusCode.warning,
                    match: false,
                    message: `לא ניתן לעשות לייק מספר פעמים לאותו משתמש`,
                };
            }
            user.likes.push(recivedUser._id);
            recivedUser.likesRecived.push(user._id);
            const match = recivedUser.likes.includes(user._id) &&
                user.likes.includes(recivedUser.id);
            if (match) {
                const chat = await this.ChatModel.create({
                    messages: [],
                    participants: [recivedUser._id, user._id],
                });
                user.chat.push(chat);
                recivedUser.chat.push(chat);
                await chat.save();
            }
            await user.save();
            await recivedUser.save();
            return {
                data: user,
                status: constants_1.statusCode.success,
                match,
                message: `${likesDto.reciverID}לייק נוסף בהצלחה משתמש:`,
            };
        }
        catch (error) {
            return {
                data: undefined,
                status: constants_1.statusCode.error,
                match: false,
                message: 'יש בעיה! לא ניתן להשלים את הפעולה',
            };
        }
    }
    async disLikes(ownerId, disLikesDto) {
        try {
            const User = await this.UserModel.findById(ownerId);
            const recivedUser = await this.UserModel.findById(disLikesDto.reciverID);
            let dateEnd = new Date();
            dateEnd.setHours(dateEnd.getHours() + 24);
            const date = dateEnd.valueOf();
            const usersId = User.dislikes.map((user) => user._id);
            if (usersId.includes(recivedUser.id)) {
                const index = User.dislikes.findIndex((item) => item._id === recivedUser.id);
                const d = new Date();
                User.dislikes[index] = { _id: recivedUser.id, date: d.valueOf() };
            }
            else {
                User.dislikes.push({ _id: recivedUser.id, date });
            }
            await User.save();
            return {
                data: User,
                status: constants_1.statusCode.success,
                message: 'dislike added',
            };
        }
        catch (error) {
            return {
                data: undefined,
                status: constants_1.statusCode.error,
                message: 'there is an error',
            };
        }
    }
    async getChatUsers(userId) {
        try {
            const myUser = await this.UserModel.findById(userId);
            const users = await this.UserModel.find({ _id: { $ne: userId } });
            const chats = await this.ChatModel.find({})
                .populate('participants')
                .exec();
            const participants = chats.map((chat) => chat.participants.map((participant) => participant.first_Name));
            const usersiLiked = users.filter((user) => user.likesRecived.includes(myUser.id) &&
                myUser.likesRecived.includes(user.id));
            console.log(chats);
            console.log(participants);
            return {
                data: usersiLiked,
                message: 'pass',
                status: constants_1.statusCode.success,
            };
        }
        catch (error) {
            return {
                data: [],
                message: 'לא נמצאו משתמשים',
                status: constants_1.statusCode.error,
            };
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Chat')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map