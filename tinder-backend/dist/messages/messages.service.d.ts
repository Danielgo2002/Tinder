import { messageDto } from './dto/message.Dto';
import { Messagess } from './entities/message.entity';
export declare class MessagesService {
    messages: Messagess[];
    clientToUser: {};
    identify(name: string, clientId: string): unknown[];
    getClientName(clientId: string): any;
    create(messageDto: messageDto): {
        name: string;
        text: string;
    };
    findAll(): Promise<Messagess[]>;
}
