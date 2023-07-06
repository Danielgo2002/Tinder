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
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async getUsers(idUser) {
        try {
            console.log(idUser);
            const users = await this.UserModel.find({ _id: { $ne: idUser } });
            console.log(users);
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
            const myOutDatedDislikes = myUser.dislikes.filter((disLike) => {
                const date = new Date(disLike.date);
                const twentyFourHoursAgo = new Date();
                twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
                if (date < twentyFourHoursAgo)
                    return disLike;
            });
            let usersfilterd = likedUsers;
            if (myOutDatedDislikes.length !== 0) {
                usersfilterd = likedUsers.filter((user) => {
                    if (myUser.dislikes.includes(user.id) &&
                        myOutDatedDislikes.includes(user.id)) {
                        return user;
                    }
                    return user;
                });
            }
            const UpdatedUsers = usersfilterd.map((element) => {
                let count = 0;
                if (element.age === (pref === null || pref === void 0 ? void 0 : pref.age) && element.location === (pref === null || pref === void 0 ? void 0 : pref.location)) {
                    count = 2;
                }
                else if (element.age === (pref === null || pref === void 0 ? void 0 : pref.age) ||
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
            console.log(sortedUsers);
            return {
                data: sortedUsers,
                message: 'pass',
                status: constants_1.statusCode.success,
            };
        }
        catch (error) {
            console.log(error);
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
            console.log(error);
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
            const match = recivedUser.likes.includes(user._id);
            if (match) {
                user.chat.push(recivedUser._id);
                recivedUser.chat.push(user._id);
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
            const date = new Date().valueOf();
            User.dislikes.push({ _id: recivedUser.id, date });
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
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map