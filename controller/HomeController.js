import { CarModel } from "../model/car_model.js";
import { randomUUID } from "node:crypto";

export class HomeController {
    static async index (req, res, next) {
        try {
            let cars = await CarModel.getAll();
            res.render("Pages/Home/index", {
                cars: cars
            });
        } catch (error) {
            next(error)
        }
    }

    static async fleet (req, res, next) {
        try {
            let cars = await CarModel.getAll();
            res.render("Pages/Fleet/index", {
                cars: cars
            });
        } catch (error) {
            next(error)
        }
    }

    static async details (req, res, next){
        try {
            let { id } = req.params
            let car = await CarModel.getById(id);
            res.render("Pages/Home/details", {
                car: car
            });
        } catch (error) {
            next(error)
        }
    }

    static async addCar (req, res, next) {
        try {
            let body = {...req.body};
            body.uuid = body.uuid || randomUUID();
            let add = await CarModel.push({body});

            res.send(add)
        } catch (error) {
            next(error);
        }
    }

    static async updateOne (req, res, next) {
        try {
            let { id } = req.params
            let body = req.body;
            let updated = await CarModel.updateById(id, body);

            res.send(updated)
        } catch (error) {
            next(error);
        }
    }

    static async removeCar (req, res, next) {
        try {
            let { id } = req.params
            let deleted = await CarModel.deleteById(id);

            res.send(deleted)
        } catch (error) {
            next(error);
        }
    }
}