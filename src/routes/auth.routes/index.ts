import express, { Request, Response, Router } from "express";
import {
    handleLogin,
    handleLogout,
    handleRefreshToken,
} from "../../controllers/authController";

const authRoutes: Router = express.Router();

authRoutes.route("/login").post(handleLogin);
authRoutes.route("/logout").post(handleLogout);
authRoutes.route("/refresh").get(handleRefreshToken);

authRoutes.get("/", (_: Request, res: Response) => {
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

export default authRoutes;
