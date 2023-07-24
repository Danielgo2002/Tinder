import { Controller  } from "@nestjs/common";
import { MessagesService } from "./messages.service";

@Controller('message')
export class UserController {
  constructor(private messageService: MessagesService) {}


 
}
