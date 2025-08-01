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
exports.registerAuthToken = exports.deleteAuthToken = exports.updateAuthToken = exports.getAuthToken = exports.authenticate = void 0;
const database_1 = __importDefault(require("../config/database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authenticate = (username, pwd) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield (0, database_1.default)("auth")
        .select([
        "users.user_id as user_id",
        "username",
        "password",
    ])
        .where("username", username)
        .first();
    if (!foundUser || foundUser === undefined) {
        throw "Username or password is incorrect";
    } //Unauthorized
    else {
        let hash = foundUser[0].password;
        hash = hash.replace(/^\$2y(.+)$/i, "$2a$1");
        const match = yield bcryptjs_1.default.compareSync(pwd, hash);
        if (match) {
            return foundUser[0];
        }
        else {
            throw "Username or password is incorrect";
        }
    }
});
exports.authenticate = authenticate;
const getAuthToken = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filters = null) {
    const builder = (0, database_1.default)("auth_tokens")
        .select(["token_id", "user_id", "token", "refreshToken"])
        .first();
    // apply filters if any
    if (filters !== null) {
        builder.where(filters);
    }
    builder.orderBy("token_id", "desc");
    return yield builder;
});
exports.getAuthToken = getAuthToken;
const updateAuthToken = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const builder = (0, database_1.default)("auth_tokens").where("user_id", id);
    // apply miltiple coumns update if any
    builder.update(data);
    return yield builder.returning(["user_id"]);
});
exports.updateAuthToken = updateAuthToken;
const registerAuthToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const builder = (0, database_1.default)("auth_tokens");
    // apply miltiple coumns update if any
    builder.insert(data);
    return yield builder.returning(["user_id"]);
});
exports.registerAuthToken = registerAuthToken;
const deleteAuthToken = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const builder = (0, database_1.default)("auth_tokens"); // apply filters if any
    if (filters !== null) {
        builder.where(filters);
    }
    builder.del();
    return true;
});
exports.deleteAuthToken = deleteAuthToken;
//# sourceMappingURL=AuthModel.js.map