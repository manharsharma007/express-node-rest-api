import { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const managePermissions = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        // get allowed role and permissions for user
    } catch (err) {
        return res.status(502).end();
    }
    next();
};

export default managePermissions;
