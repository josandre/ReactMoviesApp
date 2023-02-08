"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMovies = exports.UserMovies = void 0;
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
class UserMovies {
    constructor(partial) {
        if (partial) {
            Object.assign(partial);
        }
    }
}
exports.UserMovies = UserMovies;
const UserMovieSchema = new mongoose_1.Schema({
    idUser: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    idMovie: {
        type: Number,
        required: true
    }
});
UserMovieSchema.plugin(mongoose_unique_validator_1.default);
exports.userMovies = (0, mongoose_1.model)("UserMovies", UserMovieSchema); //tipando el objeto que se inserta en mongo
//# sourceMappingURL=User-Movies.js.map