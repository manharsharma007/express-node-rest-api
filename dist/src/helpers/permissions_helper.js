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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EAdmin = exports.can_access = void 0;
const EAdmin = Object.freeze({
    VIEW_USERS: "view_users",
    ADD_USERS: "add_users",
    EDIT_USERS: "edit_users",
    DELETE_USERS: "delete_users",
});
exports.EAdmin = EAdmin;
// check permission for the role eg (Users, View)
var can_access = (_role, _permission) => __awaiter(void 0, void 0, void 0, function* () {
    return true;
});
exports.can_access = can_access;
//# sourceMappingURL=permissions_helper.js.map