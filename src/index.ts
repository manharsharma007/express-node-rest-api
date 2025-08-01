import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import "dotenv/config";
import appRoutes from "./routes";
import { errorHandler } from "./middlewares/errorMiddleware";
import authRoutes from "./routes/auth.routes";
import verifyJWT from "./middlewares/verifyRequest";
import managePermissions from "./middlewares/permissions";
import publicRoutes from "./routes/public.routes";

const app: Express = express();

app.use(
    cors({
        credentials: true,
    })
);

app.use(compression());
app.use(cookieParser());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

// built-in middleware for json
app.use(express.json());

// routes
app.use(authRoutes);
app.use(publicRoutes);

app.use(verifyJWT);
app.use(managePermissions);
app.use(appRoutes);
app.use(errorHandler);

app.all("*", (_req, res) => {
    res.sendStatus(404);
});

const port = 8000;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
