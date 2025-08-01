import { Params, User } from "../../types/schema.types";
import { UserSchema } from "../../types/zod.schema";
import db from "../config/database";

import { getUsers, updateUser } from "../models/UserModel";

const getAllUsersService = async (
    serviceParams: Params,
    location_id: number
): Promise<User[]> => {
    const data = UserSchema.partial({
        user_id: true,
        user_default_location: true,
        firstname: true,
        lastname: true,
        user_email: true,
    }).parse(serviceParams);
    const users = await getUsers({
        ...data,
        user_location_id: location_id,
    });

    return users;
};

const getUserByIdService = async (serviceParams: Params): Promise<User[]> => {
    const data = UserSchema.partial({
        user_default_location: true,
        firstname: true,
        lastname: true,
        user_email: true,
    }).parse(serviceParams);
    const users = await getUsers({
        "rz_users.user_id": data.user_id,
    });

    return users;
};

const updateUserService = async (
    serviceParams: Params
): Promise<boolean> => {
    const trx = await db.transaction();
    try {
        let data = UserSchema.partial({
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

        await updateUser(
            {
                user_id: data.user_id,
            },
            {
                user_default_location: data.user_default_location,
            }
        );

        await trx.commit();

        return true;
    } catch (error) {
        await trx.rollback();
        throw error;
    }
};

export { getAllUsersService, getUserByIdService, updateUserService };
