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
exports.updateUserService = exports.getUserByIdService = exports.getAllUsersService = void 0;
const zod_schema_1 = require("../../types/zod.schema");
const database_1 = __importDefault(require("../config/database"));
const UserModel_1 = require("../models/UserModel");
const getAllUsersService = (serviceParams, location_id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = zod_schema_1.UserSchema.partial({
        user_id: true,
        user_default_location: true,
        firstname: true,
        lastname: true,
        user_email: true,
    }).parse(serviceParams);
    const users = yield (0, UserModel_1.getUsers)(Object.assign(Object.assign({}, data), { user_location_id: location_id }));
    return users;
});
exports.getAllUsersService = getAllUsersService;
const getUserByIdService = (serviceParams) => __awaiter(void 0, void 0, void 0, function* () {
    const data = zod_schema_1.UserSchema.partial({
        user_default_location: true,
        firstname: true,
        lastname: true,
        user_email: true,
    }).parse(serviceParams);
    const users = yield (0, UserModel_1.getUsers)({
        "rz_users.user_id": data.user_id,
    });
    return users;
});
exports.getUserByIdService = getUserByIdService;
const updateUserService = (serviceParams) => __awaiter(void 0, void 0, void 0, function* () {
    const trx = yield database_1.default.transaction();
    try {
        let data = zod_schema_1.UserSchema.partial({
            user_id: true,
            user_location_id: true,
            user_default_location: true,
            firstname: true,
            lastname: true,
            user_email: true,
        }).parse(serviceParams);
        if (Object.keys(data).length <= 0) {
            throw new TypeError("Please provide valid data to update");
        }
        yield (0, UserModel_1.updateUser)({
            user_id: data.user_id,
        }, {
            user_default_location: data.user_default_location,
        });
        yield trx.commit();
        return true;
    }
    catch (error) {
        yield trx.rollback();
        throw error;
    }
});
exports.updateUserService = updateUserService;
//# sourceMappingURL=usersService.js.map