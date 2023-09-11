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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../constants");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const argon = require("argon2");
const faker_1 = require("@faker-js/faker");
let AuthService = class AuthService {
    create(imageData) {
        throw new Error('Method not implemented.');
    }
    constructor(UserModel, config, jwt) {
        this.UserModel = UserModel;
        this.config = config;
        this.jwt = jwt;
    }
    async signUp(signUpDto, file) {
        try {
            const exsistUser = await this.UserModel.findOne({
                gmail: signUpDto.gmail,
            });
            if (exsistUser) {
                return {
                    data: undefined,
                    status: constants_1.statusCode.error,
                    message: 'duplicate error. this email alredy taken...',
                };
            }
            const hash = await argon.hash(signUpDto.password);
            delete signUpDto.password;
            const newobj = Object.assign(Object.assign({}, signUpDto), { hash });
            const User = new this.UserModel(newobj);
            if (file) {
                User.image = file.filename;
            }
            User.image = file.filename;
            await User.save();
            const access_Token = await (await this.accessToken(User.id, User.gmail)).access_token;
            const refresh_token = await (await this.refreshToken(User.id, User.gmail)).refresh_token;
            return {
                access_Token,
                refresh_token,
                data: User,
                status: constants_1.statusCode.success,
                message: 'משתמש נוצר בהצלחה',
            };
        }
        catch (error) {
            return {
                data: undefined,
                status: constants_1.statusCode.error,
                message: 'קרתה בעיה ביצירת משתמש',
            };
        }
    }
    async signIn(signInDto) {
        const User = await this.UserModel.findOne({ gmail: signInDto.gmail });
        if (!User) {
            return {
                data: undefined,
                status: constants_1.statusCode.error,
                message: 'משתמש לא נמצא נסה שנית',
            };
        }
        const pwMatches = await argon.verify(User.hash, signInDto.password);
        if (!pwMatches)
            return {
                data: undefined,
                status: constants_1.statusCode.error,
                message: 'משתמש או סיסמא אינם נכונים',
            };
        const access_Token = (await this.accessToken(User.id, User.gmail))
            .access_token;
        const refresh_token = (await this.refreshToken(User.id, User.gmail))
            .refresh_token;
        return { access_Token, refresh_token, User };
    }
    async addPreferences(preferencesDto, userId) {
        const findUser = await this.UserModel.findById(userId);
        const preferences = {
            gender: preferencesDto.gender,
            MinAge: preferencesDto.MinAge,
            MaxAge: preferencesDto.MaxAge,
            location: preferencesDto.location,
            id: userId,
        };
        findUser.preferences = preferences;
        await findUser.save();
        return {
            data: preferences,
            status: constants_1.statusCode.success,
            message: 'העדפות חדשות נכנסו למערכת...',
        };
    }
    async accessToken(id, gmail) {
        const payload = {
            sub: id,
            gmail,
        };
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '1h',
            secret: secret,
        });
        return {
            access_token: token,
        };
    }
    async refreshToken(id, gmail) {
        const payload = {
            sub: id,
            gmail,
        };
        const secret = this.config.get('JWT_SECRET_REFRESH');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '24h',
            secret: secret,
        });
        return { refresh_token: token };
    }
    async refresh(user) {
        const access_Token = await this.accessToken(user.id, user.gmail);
        return access_Token;
    }
    async createUsers() {
        const hash = await argon.hash('123456');
        for (let index = 0; index < 10; index++) {
            const first_Name = faker_1.faker.person.firstName();
            const last_Name = faker_1.faker.person.lastName();
            const gmail = faker_1.faker.internet.email();
            const gender = faker_1.faker.person.sex();
            const summery = faker_1.faker.person.bio();
            const image = faker_1.faker.image.avatarLegacy();
            const age = Math.floor(Math.random() * (70 - 18 + 1) + 18);
            const location = index % 3 === 0 ? 'center' : index % 2 === 0 ? 'north' : 'south';
            const User = new this.UserModel({
                first_Name,
                last_Name,
                gmail,
                hash,
                summery,
                gender,
                location,
                image,
                age,
            });
            await User.save();
        }
        return 'success';
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map