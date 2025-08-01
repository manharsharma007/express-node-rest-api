import express, { Router } from "express";
import usersRoutes from "./app.routes/users.route";
const appRoutes: Router = express.Router();

appRoutes.use("/users", usersRoutes);

export default appRoutes;
