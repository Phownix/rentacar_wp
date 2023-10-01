import { Router } from "express";
import { CategorieController } from "../controller/categorie_controller.js";
import { isAdmin } from "../middleware/auth_middleware.js";

export const CategorieRoute = Router();

CategorieRoute.get('/', CategorieController.index);

CategorieRoute.post('/', isAdmin, CategorieController.addCategorie);