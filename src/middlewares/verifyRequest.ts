import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { getUsers } from "../models/UserModel";
dotenv.config(); // Load environment variables from .env file

const apiKey: string = process.env.ACCESS_TOKEN_SECRET!;

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const apiKeyHeader = req.headers["x-api-key"];

    if (!authHeader && !apiKeyHeader) return res.sendStatus(401);

    // check for auth header first - priority 1
    if (authHeader) {
        const token = authHeader!.split(" ")[1];

        jwt.verify(token, apiKey, (err, decoded) => {
            if (err) return res.sendStatus(401); //invalid token Forbidden
            res.locals = {
                ...res.locals,
                userID: (<JwtPayload>decoded).userID,
            };

            next();
            return;
        });
    } else if (apiKeyHeader) {
        if (apiKey.trim() == "") return res.sendStatus(401);
        getUsers({
            "auth.auth_api_key": apiKeyHeader,
            "auth.auth_api_expiry": {
                operator: ">",
                operand: new Date().toJSON().slice(0, 10),
            },
        })
            .then((response) => {
                res.locals = {
                    ...res.locals,
                    userID: response[0].user_id,
                };
            })
            .catch((_) => {
                return res.sendStatus(401);
            })
            .finally(() => {
                next();
                return;
            });
    }

    return;
};

export default verifyJWT;
