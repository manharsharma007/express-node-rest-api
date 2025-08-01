import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

export function errorHandler(
    err: Error | ZodError,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    if (err instanceof z.ZodError || err instanceof TypeError) {
        statusCode = 400;
    }

    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    });
}
