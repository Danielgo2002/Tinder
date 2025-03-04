"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferencesDto = void 0;
const class_validator_1 = require("class-validator");
const Enums_1 = require("../Schemas/Enums");
class preferencesDto {
}
__decorate([
    (0, class_validator_1.IsEnum)(Enums_1.gender),
    __metadata("design:type", String)
], preferencesDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], preferencesDto.prototype, "MinAge", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], preferencesDto.prototype, "MaxAge", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Enums_1.location),
    __metadata("design:type", String)
], preferencesDto.prototype, "location", void 0);
exports.preferencesDto = preferencesDto;
//# sourceMappingURL=prefrences.Dto.js.map