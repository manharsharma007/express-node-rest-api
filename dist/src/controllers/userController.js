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
exports.updateUserHandle = exports.getUserByIDHandle = exports.getAllUsersHandle = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const permissions_helper_1 = require("../helpers/permissions_helper");
const usersService_1 = require("../services/usersService");
const getAllUsersHandle = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield (0, permissions_helper_1.can_access)(res.locals._role, permissions_helper_1.EAdmin.VIEW_USERS)) {
            let params = Object.assign(Object.assign({}, _req.query), { user_location_id: res.locals.location_id });
            const users = yield (0, usersService_1.getAllUsersService)(params, res.locals.location_id);
            res.json(users);
        }
        else {
            res.status(403).send("Cannot access this resource");
        }
    }
    catch (error) {
        _next(error);
    }
});
exports.getAllUsersHandle = getAllUsersHandle;
const getUserByIDHandle = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield (0, permissions_helper_1.can_access)(res.locals._role, permissions_helper_1.EAdmin.VIEW_USERS)) {
            const user = yield (0, usersService_1.getUserByIdService)({
                user_id: res.locals.userID,
            });
            res.json(user);
        }
        else {
            res.status(403).send("Cannot access this resource");
        }
    }
    catch (error) {
        _next(error);
    }
});
exports.getUserByIDHandle = getUserByIDHandle;
const updateUserHandle = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield (0, permissions_helper_1.can_access)(res.locals._role, permissions_helper_1.EAdmin.EDIT_USERS)) {
            const result = yield (0, usersService_1.updateUserService)(Object.assign(Object.assign({}, _req.body), { user_id: res.locals.userID }));
            res.json(result);
        }
        else {
            res.status(403).send("Cannot access this resource");
        }
    }
    catch (error) {
        _next(error);
    }
});
exports.updateUserHandle = updateUserHandle;
//# sourceMappingURL=userController.js.map