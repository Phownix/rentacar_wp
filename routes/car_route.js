import { Router } from "express";
import { CarController } from "../controller/car_controller.js"
import { isAdmin } from "../middleware/auth_middleware.js";

export const CarRoute = Router();

CarRoute.get('/', CarController.index);
CarRoute.get('/:id', CarController.getOne);

CarRoute.post('/', isAdmin, CarController.addCar);
CarRoute.put('/:id', isAdmin, CarController.updateOne);
CarRoute.delete('/:id', isAdmin, CarController.removeCar);