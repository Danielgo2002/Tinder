"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gender = exports.location = exports.ageRange = void 0;
var ageRange;
(function (ageRange) {
    ageRange["LOWAGE"] = "18-24";
    ageRange["MEDIUMAGE"] = "25-32";
    ageRange["LARGEAGE"] = "33-43";
    ageRange["EXTRALARGEAGE"] = "44-100";
})(ageRange = exports.ageRange || (exports.ageRange = {}));
var location;
(function (location) {
    location["NORTH"] = "\u05E6\u05E4\u05D5\u05DF";
    location["CENTER"] = "\u05DE\u05E8\u05DB\u05D6";
    location["SOUTH"] = "\u05D3\u05E8\u05D5\u05DD";
})(location = exports.location || (exports.location = {}));
var gender;
(function (gender) {
    gender["MALE"] = "\u05D6\u05DB\u05E8";
    gender["FEMALE"] = "\u05E0\u05E7\u05D1\u05D4";
    gender["OTHER"] = "\u05D0\u05D7\u05E8";
})(gender = exports.gender || (exports.gender = {}));
//# sourceMappingURL=Enums.js.map