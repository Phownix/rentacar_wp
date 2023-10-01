import CarSchema from "../schema/car_schema.js"

export class CarModel {
    static async getAll () {
        let response = await CarSchema.find();

        return response;
    }

    static async getById ( id ) {
        let response = await CarSchema.findOne({uuid: id});

        return response
    }

    static async push ({ body }) {
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