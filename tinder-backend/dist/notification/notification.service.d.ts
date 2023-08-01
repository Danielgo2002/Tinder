import { Model } from 'mongoose';
import { NotificationDocument } from 'src/Schemas/notificationSchema';
export declare class NotificationService {
    private readonly NotificationModel;
    constructor(NotificationModel: Model<NotificationDocument>);
    getNotifications(idUser: string): Promise<{
        data: (import("mongoose").Document<unknown, any, NotificationDocument> & Omit<import("src/Schemas/notificationSchema").Notification & Document & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        message: string;
        status: string;
    }>;
}
