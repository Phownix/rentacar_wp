import mongoose from "mongoose";
import bcrypt from "bcrypt";
import 'dotenv/config'

import { UserModel } from "../model/user_model.js";
import { CarModel } from "../model/car_model.js";

const mongo = process.env.MONGO_SERVER || "mongodb://127.0.0.1:27017/rentcar"
mongoose.connect(mongo).then(() => { return true });

const defaultVeicles = [
    {
        "uuid": "11111111-1110-1110-1110-111111111111",
        "sku": "20225-toco-seau",
        "brand": "Toyota",
        "model": "Corolla",
        "year": 2022,
        "category": "Sedán",
        "seating_places": 5,
        "transmission": "automatic",
        "availability": true,
        "rentalPrice": 35000,
        "features": ["Air Conditioning", "Bluetooth", "Backup Camera"]
    },
    {
        "uuid": "22222222-2220-2220-2220-222222222222",
        "sku": "20214-hoci-coma",
        "brand": "Honda",
        "model": "Civic",
        "year": 2021,
        "category": "Coupé",
        "seating_places": 4,
        "transmission": "manual",
        "availability": true,
        "rentalPrice": 30000,
        "features": ["Sunroof", "Navigation System"]
    },
    {
        "uuid": "33333333-3330-3330-3330-333333333333",
        "sku": "20205-fofo-haau",
        "brand": "Ford",
        "model": "Focus",
        "year": 2020,
        "category": "Hatchback",
        "seating_places": 5,
        "transmission": "automatic",
        "availability": true,
        "rentalPrice": 28000,
        "features": ["Apple CarPlay", "Android Auto"]
    },
    {
        "uuid": "44444444-4440-4440-4440-444444444444",
        "sku": "20227-niro-suau",
        "brand": "Nissan",
        "model": "Rogue",
        "year": 2022,
        "category": "SUV",
        "seating_places": 7,
        "transmission": "automatic",
        "availability": false,
        "rentalPrice": 40000,
        "features": ["Leather Seats", "Heated Seats"]
    },
    {
        "uuid": "55555555-5550-5550-5550-555555555555",
        "sku": "20195-chsi-piau",
        "brand": "Chevrolet",
        "model": "Silverado",
        "year": 2019,
        "category": "Pickup",
        "seating_places": 5,
        "transmission": "automatic",
        "availability": true,
        "rentalPrice": 45000,
        "features": ["Towing Package", "Bed Liner"]
    },
    {
        "uuid": "66666666-6660-6660-6660-666666666666",
        "sku": "20208-kise-miau",
        "brand": "Kia",
        "model": "Sedona",
        "year": 2020,
        "category": "Minivan",
        "seating_places": 8,
        "transmission": "automatic",
        "availability": true,
        "rentalPrice": 38000,
        "features": ["DVD Player", "Power Sliding Doors"]
    }
];
  

(async () => {
    try {
        const existingUser = await UserModel.getById("11111111-1110-1110-1110-111111111111");
        const haveFleet = await CarModel.getAll();

        if (!existingUser) {
            const hash = bcrypt.hashSync("123456", 10);
            const defaultUser = {
                uuid: "11111111-1110-1110-1110-111111111111",
                firts_name: "Administrador",
                last_name: "Local",
                username: "11111111-1",
                email: "superuser@rentacar.cl",
                password: hash,
                type: "admin"
            };

            await UserModel.pushOne(defaultUser, false);

            console.log("Usuario por defecto creado.");
        }

        if(haveFleet.length <= 0){
            await CarModel.pushOne(defaultVeicles[0], false);
            await CarModel.pushOne(defaultVeicles[1], false);
            await CarModel.pushOne(defaultVeicles[2], false);
            await CarModel.pushOne(defaultVeicles[3], false);
            await CarModel.pushOne(defaultVeicles[4], false);
            await CarModel.pushOne(defaultVeicles[5], false);


            console.log("Vehiculos por defecto agregados.");
        }
    } catch (error) {
        console.error("Error al verificar/crear usuario por defecto:", error);
    } finally {
        mongoose.connection.close();
    }
})();