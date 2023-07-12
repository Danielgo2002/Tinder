import { PartialType } from '@nestjs/mapped-types';
import { Messagess } from '../entities/message.entity';

export class UpdateMessageDto extends PartialType(Messagess) {
  id: number;
}
