import { Router } from "express";
import { UserController } from "../controller/user_controller.js";
export const UserRoute = Router();

UserRoute.get('/', UserController.index);