"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogout = exports.handleRefreshToken = exports.handleLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const AuthModel_1 = require("../models/AuthModel");
const AccessToken = process.env.ACCESS_TOKEN_SECRET;
const RefreshToken = process.env.REFRESH_TOKEN_SECRET;
const handleLogin = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        return res.status(400).send("Both Username and password are required");
    }
    try {
        // find user with username and password matched
        const foundUser = yield (0, AuthModel_1.authenticate)(user, pwd);
        if (!foundUser)
            return res.status(401).send("Unauthorised access");
        //Unauthorized
        else {
            yield (0, AuthModel_1.deleteAuthToken)({ user_id: foundUser.user_id }); // delete the old tokens from the database
            // create JWTs
            const accessToken = jsonwebtoken_1.default.sign({
                userID: foundUser.user_id,
            }, AccessToken, { expiresIn: "10m" });
            const refreshToken = jsonwebtoken_1.default.sign({
                userID: foundUser.user_id,
            }, RefreshToken, { expiresIn: "10d" });
            // register assigned tokens for the user in the database rz_auth_tokens
            yield (0, AuthModel_1.registerAuthToken)({
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
    }
    catch (error) {
        _next(error);
    }
});
exports.handleLogin = handleLogin;
const handleRefreshToken = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookies = req.cookies;
        if (!cookies.jwt)
            return res.status(401).send("Username or password is incorrect.");
        const refreshToken = cookies.jwt; // get the refresh token
        // get the tokens for the request from the database
        const foundToken = yield (0, AuthModel_1.getAuthToken)({
            refreshToken: refreshToken,
        });
        if (foundToken === undefined) {
            return res
                .status(401)
                .send("Unverifiable tokens. Please login again.");
        }
        // evaluate jwt
        jsonwebtoken_1.default.verify(refreshToken, RefreshToken, (err, decoded) => {
            const tokenDecoded = decoded;
            if (err || foundToken.user_id !== tokenDecoded.userID)
                return res
                    .status(401)
                    .send("Username or password is incorrect.");
            const accessToken = jsonwebtoken_1.default.sign({
                userID: tokenDecoded.userID,
            }, AccessToken, {
                expiresIn: "10m",
            });
            return res.json({ accessToken });
        });
    }
    catch (error) {
        _next(error);
    }
});
exports.handleRefreshToken = handleRefreshToken;
const handleLogout = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(204); //No content
    const cookieRefreshToken = cookies.jwt;
    // Is refreshToken in db?
    (0, AuthModel_1.deleteAuthToken)({ refreshToken: cookieRefreshToken });
    // Delete refreshToken in db
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
});
exports.handleLogout = handleLogout;
//# sourceMappingURL=authController.js.map