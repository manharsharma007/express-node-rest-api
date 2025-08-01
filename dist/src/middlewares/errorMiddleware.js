"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
function errorHandler(err, _req, res, _next) {
    let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    if (err instanceof zod_1.z.ZodError || err instanceof TypeError) {
        statusCode = 400;
    }
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    });
}
//# sourceMappingURL=errorMiddleware.js.map