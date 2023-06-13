"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
exports.storage = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + (0, uuid_1.v4)();
            const extenstion = path.parse(file.originalname).ext;
            cb(null, `${filename}${extenstion}`);
        },
    }),
};
//# sourceMappingURL=upload.service.js.map