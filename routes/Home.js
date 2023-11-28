import { Router } from "express";
import { HomeController } from "../controller/HomeController.js"
import { isAdmin } from "../middleware/auth_middleware.js";

export const HomeRoute = Router();

HomeRoute.get('/', HomeController.index);
HomeRoute.get('/fleet', HomeController.fleet);
HomeRoute.get('/details/:id', HomeController.details);

HomeRoute.post('/', isAdmin, HomeController.addCar);
HomeRoute.put('/:id', isAdmin, HomeController.updateOne);
HomeRoute.delete('/:id', isAdmin, HomeController.removeCar);