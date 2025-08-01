"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controllers/userController");
const usersRoutes = express_1.default.Router();
usersRoutes.route("/list").get(userController_1.getAllUsersHandle);
usersRoutes.route("/me").get(userController_1.getUserByIDHandle);
usersRoutes.route("/update").post(userController_1.updateUserHandle);
exports.default = usersRoutes;
//# sourceMappingURL=users.route.js.map