import express, { json } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import 'dotenv/config'

// Importo las rutas
import { CarRoute } from "./routes/car_route.js"
import { CategorieRoute } from "./routes/categorie_route.js"
import { UserRoute } from "./routes/user_route.js";
import { AuthRoute } from "./routes/auth_route.js";
import { ReportRoute } from "./routes/report_route.js";
import { ReservationRoute } from "./routes/reservation_route.js";
import { AdminRoute } from "./routes/admin_route.js";

const app = express();
const port = process.env.PORT || 3000;
const mongo = process.env.MONGO_SERVER || "mongodb://127.0.0.1:27017/rentcar"

const mongo_connect = mongoose.connect(mongo).then(() => { return true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(json());


app.use(async(req, res, next) => {
    app.locals.Mongo = await mongo_connect;
    res.set({"X-Powered-By": "InacapTEAM"})

    /*
    * todo -> Configurar un sistema de autentificacion real
    */
    req.user = {
        "username": "Admin",
        "role": "admin",
        // "role": "user",
        "email": "sample@email.com"
    }

    next();
})

app.use('/api/', AuthRoute);
app.use('/api/cars', CarRoute);
app.use('/api/categories', CategorieRoute);
app.use('/api/user', UserRoute);
app.use('/api/report/sales', ReportRoute);
app.use('/api/reservation', ReservationRoute);
app.use('/api/admin', AdminRoute);

app.use((req, res, next) => {
    res.status(404).json("Cannot GET \""+req.path+"\" route")
})

app.use((err, req, res, next) => {
    res.status(500).json(err);
})

app.listen(port, () => {
    console.log(`Listen in port ${port}`);
})