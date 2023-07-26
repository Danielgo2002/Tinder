import { MessagesService } from './messages.service';
type reciverIDTo = {
    reciverId: string;
};
export declare class MessagesController {
    private MessagesService;
    constructor(MessagesService: MessagesService);
    getMessages(req: any, reciverIdObject: reciverIDTo): Promise<{
        date: number;
        content: string;
        senderId: any;
        reciverId: any;
    }[]>;
}
export {};
