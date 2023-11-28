import CarSchema from "../schema/car_schema.js"
import { v4 as uuidv4 } from 'uuid';

export class CarModel {
    static async getAll () {
        let response = await CarSchema.find();

        return response;
    }

    static async getById ( id ) {
        let response = await CarSchema.findOne({uuid: id});

        return response
    }

    static async search_sku ( sku ) {
        let response = await CarSchema.find({sku: new RegExp(sku)});

        return response
    }

    static async pushOne ( body, nid=true ) {
        body.uuid = nid ? uuidv4() : body.uuid;
        let _car = new CarSchema(body);
        let response = await _car.save();

        return response;
    }

    static async updateById (id, body){
        let response = CarSchema.updateOne({uuid: id}, body)
        console.log(id)
        console.log(body)

        return response;
    }

    static async deleteById ( id ) {
        let delated = await CarSchema.deleteOne({uuid: id})

        return delated;
    }
}