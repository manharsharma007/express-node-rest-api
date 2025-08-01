"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserModel_1 = require("../models/UserModel");
dotenv_1.default.config(); // Load environment variables from .env file
const apiKey = process.env.ACCESS_TOKEN_SECRET;
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const apiKeyHeader = req.headers["x-api-key"];
    if (!authHeader && !apiKeyHeader)
        return res.sendStatus(401);
    // check for auth header first - priority 1
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, apiKey, (err, decoded) => {
            if (err)
                return res.sendStatus(401); //invalid token Forbidden
            res.locals = Object.assign(Object.assign({}, res.locals), { userID: decoded.userID });
            next();
            return;
        });
    }
    else if (apiKeyHeader) {
        if (apiKey.trim() == "")
            return res.sendStatus(401);
        (0, UserModel_1.getUsers)({
            "auth.auth_api_key": apiKeyHeader,
            "auth.auth_api_expiry": {
                operator: ">",
                operand: new Date().toJSON().slice(0, 10),
            },
        })
            .then((response) => {
            res.locals = Object.assign(Object.assign({}, res.locals), { userID: response[0].user_id });
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
exports.default = verifyJWT;
//# sourceMappingURL=verifyRequest.js.map