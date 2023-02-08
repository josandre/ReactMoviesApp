"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.User = void 0;
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
class User {
    constructor(partial) {
        if (partial) {
            Object.assign(partial);
        }
    }
}
exports.User = User;
const Userschema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
Userschema.plugin(mongoose_unique_validator_1.default);
exports.user = (0, mongoose_1.model)("User", Userschema); //tipando el objeto que se inserta en mongo
//# sourceMappingURL=User.js.map