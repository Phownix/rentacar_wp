import { Router } from "express";
import { ReportController } from "../controller/report_controller.js";
import { isAdmin } from "../middleware/auth_middleware.js";

export const ReportRoute = Router();

ReportRoute.get('/', isAdmin, ReportController.index);