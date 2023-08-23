import { NotificationService } from './notification.service';
export declare class NotificationController {
    private NotificationService;
    constructor(NotificationService: NotificationService);
    getUsers(req: any): Promise<{
        data: (import("mongoose").Document<unknown, any, import("../Schemas/notificationSchema").NotificationDocument> & Omit<import("../Schemas/notificationSchema").Notification & Document & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        message: string;
        status: string;
    }>;
    deleteNotification(req: any): Promise<{
        data: any[];
        message: string;
        status: string;
    }>;
}
