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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const dto_1 = require("../dto");
const auth_guard_1 = require("./auth.guard");
const auth_service_1 = require("./auth.service");
const decorators_1 = require("./decorators");
const RefreshToken_guard_1 = require("./strategy/RefreshToken.guard");
let AuthController = class AuthController {
    constructor(AuthService) {
        this.AuthService = AuthService;
    }
    async signUp(signUpDto, image) {
        signUpDto.image = image;
        console.log(typeof (image));
        return this.AuthService.signUp(signUpDto, image);
    }
    signIn(signInDto) {
        return this.AuthService.signIn(signInDto);
    }
    addPreferences(req, preferencesDto) {
        return this.AuthService.addPreferences(preferencesDto, req.user.sub);
    }
    refresh(account) {
        return this.AuthService.refresh(account);
    }
};
__decorate([
    (0, common_1.Post)('signUp'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        dest: './uploads',
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.signUpDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('signIn'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.signInDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AUthGuard),
    (0, common_1.Post)('addPreferences'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.preferencesDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "addPreferences", null);
__decorate([
    (0, common_1.UseGuards)(RefreshToken_guard_1.JwtRefreshTokenGuard),
    (0, common_1.Get)('refresh'),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map