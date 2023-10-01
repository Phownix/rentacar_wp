import { Router } from "express";
import { AdminController } from "../controller/admin_controller.js";
import { isAdmin } from "../middleware/auth_middleware.js";
export const AdminRoute = Router();

AdminRoute.get('/', isAdmin, AdminController.index);