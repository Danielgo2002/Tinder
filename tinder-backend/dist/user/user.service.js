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
    async likes(likesDto) {
        try {
            const user = await this.UserModel.findById(likesDto.ownerID);
            const recivedUser = await this.UserModel.findById(likesDto.reciverID);
            const yossi = await this.UserModel.findById(likesDto.reciverID);
            console.log(yossi);
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
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map