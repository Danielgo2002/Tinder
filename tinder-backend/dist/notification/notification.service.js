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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../constants");
let NotificationService = class NotificationService {
    constructor(NotificationModel) {
        this.NotificationModel = NotificationModel;
    }
    async getNotifications(idUser) {
        try {
            const notifications = await this.NotificationModel.find({
                user: { _id: idUser },
            });
            return {
                data: notifications,
                message: 'pass',
                status: constants_1.statusCode.success,
            };
        }
        catch (error) {
            return {
                data: [],
                message: 'no messages',
                status: constants_1.statusCode.error,
            };
        }
    }
    async deleteNotification(idUser) {
        try {
            console.log('wa');
            const notification = await this.NotificationModel.remove({
                user: idUser,
            });
            await notification.save();
            return {
                data: [],
                message: 'ההודעות נמחקו בהצלחה',
                status: constants_1.statusCode.success,
            };
        }
        catch (error) {
            return {
                data: [],
                message: 'קרתה שגיאה',
                status: constants_1.statusCode.error,
            };
        }
    }
};
NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Notification')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map