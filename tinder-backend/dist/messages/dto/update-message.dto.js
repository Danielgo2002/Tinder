"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMessageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const message_entity_1 = require("../entities/message.entity");
class UpdateMessageDto extends (0, mapped_types_1.PartialType)(message_entity_1.Messagess) {
}
exports.UpdateMessageDto = UpdateMessageDto;
//# sourceMappingURL=update-message.dto.js.map