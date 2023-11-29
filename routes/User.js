import { Router } from "express";
import { UserController } from "../controller/UserController.js";
export const UserRoute = Router();

UserRoute.get('/', UserController.index);
UserRoute.get('/rent', UserController.rent);
UserRoute.get('/search/users', UserController.search_users);
UserRoute.get('/search/car', UserController.search_car);
UserRoute.get('/manage/cars', UserController.manage_cars);
UserRoute.get('/manage/users', UserController.manage_users);
UserRoute.get('/manage/employees', UserController.manage_employees);
UserRoute.get('/manage/employees/add', UserController.add_employee);
UserRoute.get('/company', UserController.company);

UserRoute.post('/manage/employees/add', UserController.add_employee_post);