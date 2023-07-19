import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AUthGuard } from "src/Auth/auth.guard";
import { MessagesService } from "./messages.service";

@Controller('message')
export class UserController {
  constructor(private messageService: MessagesService) {}

//   @UseGuards(AUthGuard)
//   @Post('chats')
//   likes(@Request() req ) {
//     return this.messageService.likes(req.user.sub,  );
//   }
//   @UseGuards(AUthGuard)
//   @Get('getChats')
//   disLikes(@Request() req) {
//     return this.messageService.disLikes(req.user.sub, );
//   }
 
}
