import db from "../config/database";
import { User, Params } from "../../types/schema.types";
import { Knex } from "knex";

const getUsers = async (filters: Params | null = null): Promise<User[]> => {
    const builder = db<User>("users")
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
            } else if (value instanceof Object) {
                builder.where(
                    key,
                    (value as any).operator,
                    (value as any).operand
                );
            } else {
                builder.where(key, value);
            }
        }
    }

    builder.where("rz_users.is_deleted", 0);

    return await builder;
};

const updateUser = async (
    where: Params,
    data: Params,
    _trx: Knex.Transaction<any, any[]> | Knex<any, unknown[]> = db
): Promise<boolean> => {
    const builder = _trx("users");

    // apply filters if any
    if (where != null) {
        for (const [key, value] of Object.entries(where)) {
            if (value instanceof Array) {
                builder.whereIn(key, value);
            } else {
                builder.where(key, value);
            }
        }
    }
    // apply miltiple coumns update if any
    await builder.update(data);

    return true;
};

export { getUsers, updateUser };
