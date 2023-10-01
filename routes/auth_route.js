import { Router } from "express";
import { AuthController } from "../controller/auth_controller.js";
export const AuthRoute = Router();

AuthRoute.get('/login', AuthController.index);
AuthRoute.get('/register', AuthController.index);

// Authentication with google
AuthRoute.get('/auth/google', AuthController.index);

AuthRoute.get('/logout', AuthController.index);