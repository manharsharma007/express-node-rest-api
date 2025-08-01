import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

import {
    authenticate,
    deleteAuthToken,
    getAuthToken,
    registerAuthToken,
} from "../models/AuthModel";

const AccessToken: string = process.env.ACCESS_TOKEN_SECRET!;
const RefreshToken: string = process.env.REFRESH_TOKEN_SECRET!;

const handleLogin = async (
    req: Request,
    res: Response,
    _next: NextFunction
): Promise<Response | void> => {
    const { user, pwd } = req.body;

    if (!user || !pwd) {
        return res.status(400).send("Both Username and password are required");
    }

    try {
        // find user with username and password matched
        const foundUser = await authenticate(user, pwd);

        if (!foundUser) return res.status(401).send("Unauthorised access");
        //Unauthorized
        else {
            await deleteAuthToken({ user_id: foundUser.user_id }); // delete the old tokens from the database
            // create JWTs
            const accessToken = jwt.sign(
                {
                    userID: foundUser.user_id,
                },
                AccessToken,
                { expiresIn: "10m" }
            );

            const refreshToken = jwt.sign(
                {
                    userID: foundUser.user_id,
                },
                RefreshToken,
                { expiresIn: "10d" }
            );
            // register assigned tokens for the user in the database rz_auth_tokens
            await registerAuthToken({
                token: accessToken,
                refreshToken: refreshToken,
                user_id: foundUser.user_id,
                created_on: new Date()
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " "),
            });
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 10 * 24 * 60 * 60 * 1000,
            });
            return res.json({ accessToken });
        }
    } catch (error) {
        _next(error);
    }
};

const handleRefreshToken = async (
    req: Request,
    res: Response,
    _next: NextFunction
): Promise<Response | void> => {
    try {
        const cookies = req.cookies;
        if (!cookies.jwt)
            return res.status(401).send("Username or password is incorrect.");
        const refreshToken: string = cookies.jwt; // get the refresh token

        // get the tokens for the request from the database
        const foundToken = await getAuthToken({
            refreshToken: refreshToken,
        });
        if (foundToken === undefined) {
            return res
                .status(401)
                .send("Unverifiable tokens. Please login again.");
        }

        // evaluate jwt
        jwt.verify(refreshToken, RefreshToken, (err, decoded) => {
            const tokenDecoded = decoded as { [key: string]: string | number };
            if (err || foundToken.user_id !== tokenDecoded.userID)
                return res
                    .status(401)
                    .send("Username or password is incorrect.");
            const accessToken = jwt.sign(
                {
                    userID: tokenDecoded.userID,
                },
                AccessToken,
                {
                    expiresIn: "10m",
                }
            );
            return res.json({ accessToken });
        });
    } catch (error) {
        _next(error);
    }
};

const handleLogout = async (
    req: Request,
    res: Response,
    _next: NextFunction
): Promise<Response> => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const cookieRefreshToken = cookies.jwt;

    // Is refreshToken in db?
    deleteAuthToken({ refreshToken: cookieRefreshToken });

    // Delete refreshToken in db
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
};
export { handleLogin, handleRefreshToken, handleLogout };
