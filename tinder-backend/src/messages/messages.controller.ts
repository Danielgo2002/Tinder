import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AUthGuard } from 'src/Auth/auth.guard';
import { MessagesService } from './messages.service';

type reciverIDTo = {
  reciverId: string;
};
@Controller('message')
export class MessagesController {
  constructor(private MessagesService: MessagesService) {}

  @UseGuards(AUthGuard)
  @Post('getMessages')
  getMessages(@Request() req, @Body() reciverIdObject: reciverIDTo) {
    return this.MessagesService.getMessages(
      req.user.sub,
      reciverIdObject.reciverId,
    );
  }
}
