"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./Auth/auth.module");
const user_module_1 = require("./user/user.module");
const platform_express_1 = require("@nestjs/platform-express");
const serve_static_1 = require("@nestjs/serve-static");
const app_root_path_1 = require("app-root-path");
const messages_module_1 = require("./messages/messages.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [serve_static_1.ServeStaticModule.forRoot({
                rootPath: `${app_root_path_1.path}/uploads`,
                serveRoot: '/static',
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot('mongodb://localhost/tinder'),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            platform_express_1.MulterModule.register({ dest: './uploads', }),
            messages_module_1.MessagesModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map