import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AUthGuard } from 'src/Auth/auth.guard';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
    constructor(private NotificationService: NotificationService) {}

    @UseGuards(AUthGuard)
  @Get('getNotifications')
  getUsers(@Request() req) {
    return this.NotificationService.getNotifications(req.user.sub);
  }



}
