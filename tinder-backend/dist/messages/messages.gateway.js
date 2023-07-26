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
exports.MessagesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MessagesGateway = class MessagesGateway {
    constructor(UserModel, ChatModel, MessageModel) {
        this.UserModel = UserModel;
        this.ChatModel = ChatModel;
        this.MessageModel = MessageModel;
        this.users = new Map();
    }
    handleConnection(client) {
        const mongoId = client.handshake.query.id;
        this.users.set(mongoId, client.id);
    }
    async handleMessage(data) {
        const myUser = await this.UserModel.findById(data.senderId).populate('chats');
        const otherUser = await this.UserModel.findById(data.reciverId).populate('chats');
        const message = await new this.MessageModel({
            sender: myUser,
            reciver: otherUser,
            content: data.content,
            date: data.date,
        });
        const chat = await this.ChatModel.findOne({
            $and: [{ participants: { $all: [myUser, otherUser] } }],
        }).populate('messages');
        chat.messages.push(message);
        message.chat = chat;
        await chat.save();
        message.save();
        this.server.to(this.users.get(data.senderId)).emit('recived', data);
        if (this.users.get(data.reciverId) != undefined) {
            this.server.to(this.users.get(data.reciverId)).emit('recived', data);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Socket)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendToUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleMessage", null);
MessagesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: '*',
    }),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Chat')),
    __param(2, (0, mongoose_1.InjectModel)('Message')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], MessagesGateway);
exports.MessagesGateway = MessagesGateway;
//# sourceMappingURL=messages.gateway.js.map