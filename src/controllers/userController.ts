import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

import { can_access, EAdmin } from "../helpers/permissions_helper";
import {
    getAllUsersService,
    getUserByIdService,
    updateUserService,
} from "../services/usersService";

const getAllUsersHandle = async (
    _req: Request,
    res: Response,
    _next: NextFunction
): Promise<Response | void> => {
    try {
        if (await can_access(res.locals._role, EAdmin.VIEW_USERS)) {
            let params = {
                ..._req.query,
                user_location_id: res.locals.location_id,
            };
            const users = await getAllUsersService(
                params,
                res.locals.location_id
            );
            res.json(users);
        } else {
            res.status(403).send("Cannot access this resource");
        }
    } catch (error) {
        _next(error);
    }
};

const getUserByIDHandle = async (
    _req: Request,
    res: Response,
    _next: NextFunction
): Promise<Response | void> => {
    try {
        if (await can_access(res.locals._role, EAdmin.VIEW_USERS)) {
            const user = await getUserByIdService({
                user_id: res.locals.userID,
            });
            res.json(user);
        } else {
            res.status(403).send("Cannot access this resource");
        }
    } catch (error) {
        _next(error);
    }
};

const updateUserHandle = async (
    _req: Request,
    res: Response,
    _next: NextFunction
): Promise<Response | void> => {
    try {
        if (await can_access(res.locals._role, EAdmin.EDIT_USERS)) {
            const result = await updateUserService(
                { ..._req.body, user_id: res.locals.userID }
            );
            res.json(result);
        } else {
            res.status(403).send("Cannot access this resource");
        }
    } catch (error) {
        _next(error);
    }
};

export { getAllUsersHandle, getUserByIDHandle, updateUserHandle };
