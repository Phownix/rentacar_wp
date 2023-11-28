import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";
export const AuthRoute = Router();

AuthRoute.get('/login', isAuthenticated, AuthController.login);
AuthRoute.get('/register', isAuthenticated, AuthController.register);

AuthRoute.get('/logout', AuthController.logout);

AuthRoute.post('/login', AuthController.login_post);
AuthRoute.post('/register', AuthController.register_post);


function isAuthenticated(req, res, next) {
    if(!req.isAuthenticated()) { return next(); }
    res.redirect('/account/')
}