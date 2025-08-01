"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const verifyRequest_1 = __importDefault(require("./middlewares/verifyRequest"));
const permissions_1 = __importDefault(require("./middlewares/permissions"));
const public_routes_1 = __importDefault(require("./routes/public.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
// built-in middleware to handle urlencoded form data
app.use(express_1.default.urlencoded({ extended: true }));
// built-in middleware for json
app.use(express_1.default.json());
// routes
app.use(auth_routes_1.default);
app.use(public_routes_1.default);
app.use(verifyRequest_1.default);
app.use(permissions_1.default);
app.use(routes_1.default);
app.use(errorMiddleware_1.errorHandler);
app.all("*", (_req, res) => {
    res.sendStatus(404);
});
const port = 8000;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
//# sourceMappingURL=index.js.map