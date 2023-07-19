import { Model } from 'mongoose';
import { UserDocument } from 'src/Schemas/userSchema';
import { messageDto } from './dto/message.Dto';
import { Messagess } from './entities/message.entity';
export declare class MessagesService {
    private readonly UserModel;
    messages: Messagess[];
    clientToUser: {};
    constructor(UserModel: Model<UserDocument>);
    identify(name: string, clientId: string): unknown[];
    getClientName(clientId: string): any;
    create(messageDto: messageDto): {
        name: string;
        text: string;
    };
    chats(): void;
    findAll(): Promise<Messagess[]>;
}
