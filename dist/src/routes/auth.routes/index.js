"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../../controllers/authController");
const authRoutes = express_1.default.Router();
authRoutes.route("/login").post(authController_1.handleLogin);
authRoutes.route("/logout").post(authController_1.handleLogout);
authRoutes.route("/refresh").get(authController_1.handleRefreshToken);
authRoutes.get("/", (_, res) => {
    let date_ob = new Date(Date.now());
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    const healthcheck = {
        uptime: process.uptime() / 60,
        message: "OK",
        timestamp: year + "-" + month + "-" + date,
    };
    res.send(JSON.stringify(healthcheck));
});
exports.default = authRoutes;
//# sourceMappingURL=index.js.map