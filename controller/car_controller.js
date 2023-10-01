import { CarModel } from "../model/car_model.js";
import { randomUUID } from "node:crypto";

export class CarController {
    static async index (req, res, next) {
        try {
            let cars = await CarModel.getAll();
            res.json(cars);
        } catch (error) {
            next(error)
        }
    }

    static async getOne (req, res, next){
        try {
            let { id } = req.params
            let car = await CarModel.getById(id);
            res.json(car);
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