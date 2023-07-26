"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesModule = void 0;
const common_1 = require("@nestjs/common");
const messages_gateway_1 = require("./messages.gateway");
const mongoose_1 = require("@nestjs/mongoose");
const userSchema_1 = require("../Schemas/userSchema");
const messageSchemas_1 = require("../Schemas/messageSchemas");
const chatSchema_1 = require("../Schemas/chatSchema");
const messages_service_1 = require("./messages.service");
const messages_controller_1 = require("./messages.controller");
const jwt_1 = require("@nestjs/jwt");
let MessagesModule = class MessagesModule {
};
MessagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: chatSchema_1.Chat.name, schema: chatSchema_1.ChatSchema },
                { name: userSchema_1.User.name, schema: userSchema_1.UserSchema },
                { name: messageSchemas_1.Message.name, schema: messageSchemas_1.MessageSchema },
            ]),
            jwt_1.JwtModule.register({}),
        ],
        controllers: [messages_controller_1.MessagesController],
        providers: [messages_gateway_1.MessagesGateway, messages_service_1.MessagesService],
    })
], MessagesModule);
exports.MessagesModule = MessagesModule;
//# sourceMappingURL=messages.module.js.map