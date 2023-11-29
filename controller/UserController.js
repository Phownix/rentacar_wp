import bcrypt from "bcrypt";

import { UserModel } from "../model/user_model.js";
import { CarModel } from "../model/car_model.js";

export class UserController {
    static async index (req, res, next) {
        try {
            if(!req.user) throw new Error ("inicia seson para continuar")
            
            const {type} = req.user
            switch (type) {
                case "admin":
                    res.redirect("/account/manage/employees");
                    break;
                case "manager":
                    res.redirect("/account/manage/cars");
                    break;
                case "employee":
                    res.redirect("account/rent");
                    break
                case "user":
                    res.redirect("/");
                    break
                default:
                    res.redirect("/")
                    break;
            }
        } catch (error) {
            next(error)
        }
    }

    static async rent (req, res, next) {
        let usr = []
        if(req.query.run != undefined && req.query.run){
            usr = await UserModel.getByRut(req.query.run)
        }

        res.render("Pages/Account/rent", {
            usr: req.user,
            page: "rent",
            openform: (req.query.run && req.query.run != undefined) ? true : false,
            user: usr
        })
    }

    static async search_users (req, res, next) {
        let result = req.query.run != undefined ? await UserModel.search_rut(req.query.run) : false;

        res.render("Pages/Account/search_users", {
            usr: req.user,
            page: "s_users",
            result: result
        })
    }

    static async search_car (req, res, next) {
        let result = req.query.sku != undefined ? await CarModel.search_sku(req.query.sku) : false;

        res.render("Pages/Account/search_car", {
            usr: req.user,
            page: "s_car",
            result: result
        })
    }

    static async manage_cars (req, res, next) {
        let result = await CarModel.getAll();

        res.render("Pages/Account/manage_cars", {
            usr: req.user,
            page: "m_cars",
            result: result
        })
    }

    static async manage_users (req, res, next) {
        res.render("Pages/Account/manage_users", {
            usr: req.user,
            page: "m_users"
        })
    }

    static async manage_employees (req, res, next) {
        let empl = await UserModel.getEmployee();

        res.render("Pages/Account/manage_employees", {
            usr: req.user,
            page: "m_employees",
            employees: empl.length > 0 ? empl : false
        })
    }

    static async add_employee (req, res, next) {
        res.render("Pages/Account/add_employee", {
            usr: req.user,
            page: "m_employees",
            type: req.query.type ?? null
        })
    }

    static async add_employee_post (req, res, next) {
        const hash = bcrypt.hashSync("123456", 10);
        req.body.password = hash;

        let action = await UserModel.pushOne(req.body);

        res.redirect("/account/manage/employees");
    }

    static async company (req, res, next) {
        res.render("Pages/Account/company", {
            usr: req.user,
            page: "company"
        })
    }
}