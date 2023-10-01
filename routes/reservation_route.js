import { Router } from "express";
import { ReservationController } from "../controller/reservation_controller.js";
export const ReservationRoute = Router();

ReservationRoute.get('/', ReservationController.index);