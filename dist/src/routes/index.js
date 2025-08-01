"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_route_1 = __importDefault(require("./app.routes/users.route"));
const appRoutes = express_1.default.Router();
appRoutes.use("/users", users_route_1.default);
exports.default = appRoutes;
//# sourceMappingURL=index.js.map