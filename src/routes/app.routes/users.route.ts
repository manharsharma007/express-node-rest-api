import express, { Router } from "express";
import {
    getAllUsersHandle,
    getUserByIDHandle,
    updateUserHandle,
} from "../../controllers/userController";
const usersRoutes: Router = express.Router();

usersRoutes.route("/list").get(getAllUsersHandle);
usersRoutes.route("/me").get(getUserByIDHandle);
usersRoutes.route("/update").post(updateUserHandle);

export default usersRoutes;
