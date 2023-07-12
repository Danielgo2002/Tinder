import { Messagess } from '../entities/message.entity';
declare const UpdateMessageDto_base: import("@nestjs/mapped-types").MappedType<Partial<Messagess>>;
export declare class UpdateMessageDto extends UpdateMessageDto_base {
    id: number;
}
export {};
