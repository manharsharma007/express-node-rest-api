import db from "../config/database";
import bcrypt from "bcryptjs";
import { Auth, AuthToken, Params } from "../../types/schema.types";

const authenticate = async (username: string, pwd: string): Promise<Auth> => {
    const foundUser = await db<Auth>("auth")
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
        const match = await bcrypt.compareSync(pwd, hash);

        if (match) {
            return foundUser[0];
        } else {
            throw "Username or password is incorrect";
        }
    }
};

const getAuthToken = async (
    filters: Params | null = null
): Promise<AuthToken | undefined> => {
    const builder = db<AuthToken>("auth_tokens")
        .select(["token_id", "user_id", "token", "refreshToken"])
        .first();

    // apply filters if any
    if (filters !== null) {
        builder.where(filters);
    }
    builder.orderBy("token_id", "desc");

    return await builder;
};

const updateAuthToken = async (id: number, data: Params): Promise<number> => {
    const builder = db("auth_tokens").where("user_id", id);

    // apply miltiple coumns update if any
    builder.update(data);

    return await builder.returning(["user_id"]);
};

const registerAuthToken = async (data: Params): Promise<number> => {
    const builder = db("auth_tokens");

    // apply miltiple coumns update if any
    builder.insert(data);

    return await builder.returning(["user_id"]);
};

const deleteAuthToken = async (filters: Params): Promise<boolean> => {
    const builder = db("auth_tokens"); // apply filters if any

    if (filters !== null) {
        builder.where(filters);
    }

    builder.del();

    return true;
};

export {
    authenticate,
    getAuthToken,
    updateAuthToken,
    deleteAuthToken,
    registerAuthToken,
};
