import UserSchema from "../schema/user_schema.js";
import { v4 as uuidv4 } from 'uuid';

export class UserModel {
    static async getAll () {
        let response = await UserSchema.find();

        return response;
    }

    static async getByRut ( rut ) {
        let response = await UserSchema.findOne({"username": rut});

        return response;
    }

    static async getById ( id ) {
        let response = await UserSchema.findOne({uuid: id});
        
        return response;
    }

    static async search_rut ( rut ) {
        let response = await UserSchema.find({"username": rut});

        return response;
    }

    static async pushOne ( body, nid=true ) {
        body.uuid = nid ? uuidv4() : body.uuid;
        let _user = new UserSchema(body);
        let response = await _user.save();

        return response;
    }

    static async updateById (id, body){
        let response = UserSchema.updateOne({"uuid": id}, body);

        return response;
    }

    static async deleteById ( id ) {
        let delated = await UserSchema.deleteOne({"uuid": id});

        return delated;
    }
}