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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../Auth/auth.guard");
const disLike_dto_1 = require("../dto/disLike.dto");
const likes_Dto_1 = require("../dto/likes.Dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(UserService) {
        this.UserService = UserService;
    }
    likes(req, likesDto) {
        return this.UserService.likes(req.user.sub, likesDto);
    }
    disLikes(req, disLikesDto) {
        return this.UserService.disLikes(req.user.sub, disLikesDto);
    }
    getUsers(req) {
        return this.UserService.getUsers(req.user.sub);
    }
    getFilterUsers(req) {
        return this.UserService.getFilterUsers(req.user.sub);
    }
    getMyUser(req) {
        return this.UserService.getMyUser(req.user.sub);
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AUthGuard),
    (0, common_1.Post)('likes'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, likes_Dto_1.likesDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "likes", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AUthGuard),
    (0, common_1.Post)('dislikes'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, disLike_dto_1.disLikesDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "disLikes", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AUthGuard),
    (0, common_1.Get)('getUsers'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AUthGuard),
    (0, common_1.Get)('getFilterUsers'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getFilterUsers", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AUthGuard),
    (0, common_1.Get)('getMyUser'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getMyUser", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map