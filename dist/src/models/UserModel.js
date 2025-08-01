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
exports.updateUser = exports.getUsers = void 0;
const database_1 = __importDefault(require("../config/database"));
const getUsers = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filters = null) {
    const builder = (0, database_1.default)("users")
        .select([
        "user_id",
        "username",
        "firstname",
        "lastname",
        "user_email",
        "user_location_id",
        "user_default_location",
        "is_active",
    ]);
    // apply filters if any
    if (filters != null) {
        for (const [key, value] of Object.entries(filters)) {
            if (value instanceof Array) {
                builder.whereIn(key, value);
            }
            else if (value instanceof Object) {
                builder.where(key, value.operator, value.operand);
            }
            else {
                builder.where(key, value);
            }
        }
    }
    builder.where("rz_users.is_deleted", 0);
    return yield builder;
});
exports.getUsers = getUsers;
const updateUser = (where_1, data_1, ...args_1) => __awaiter(void 0, [where_1, data_1, ...args_1], void 0, function* (where, data, _trx = database_1.default) {
    const builder = _trx("users");
    // apply filters if any
    if (where != null) {
        for (const [key, value] of Object.entries(where)) {
            if (value instanceof Array) {
                builder.whereIn(key, value);
            }
            else {
                builder.where(key, value);
            }
        }
    }
    // apply miltiple coumns update if any
    yield builder.update(data);
    return true;
});
exports.updateUser = updateUser;
//# sourceMappingURL=UserModel.js.map