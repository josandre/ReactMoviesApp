"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
class UserController {
    constructor() {
        this.route = "User";
        this.router = express_1.default.Router();
        this.initializeSubRoutes();
    }
    initializeSubRoutes() {
        this.router.get('/', this.getUser);
    }
    async getUser(req, res) {
        try {
            const userR = await User_1.user.findOne();
            res.send(userR);
        }
        catch (error) {
            res.send("It could not be get it");
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map