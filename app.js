import express, { json } from "express";
import bodyParser from "body-parser";
import nunjucks from "nunjucks";
import mongoose from "mongoose";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import 'dotenv/config'

import { UserModel } from "./model/user_model.js";

// Importo las rutas
import { HomeRoute } from "./routes/Home.js"
import { UserRoute } from "./routes/User.js";
import { AuthRoute } from "./routes/Auth.js";

// import { corsOptions } from "./middleware/cors_middleware.js"

const app = express();
const port = process.env.PORT || '3000';
const mongo = process.env.MONGO_SERVER || "mongodb://127.0.0.1:27017/rentcar"
mongoose.connect(mongo).then(() => { return true });

// Configurar Nunjucks
nunjucks.configure(["template/"], {
    autoescape: true,
    express: app
});

app.set('trust proxy', 1)

// Middlewares
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(json());
app.use(
    session({
        secret: process.env.SESSIONSECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', express.static('public'));

app.use(async(req, res, next) => {
    app.locals.user = req.user;
    app.locals.path = req.path != '/companies' && req.path != '/fleet' && req.path != '/' ? 'account' : req.path;

    res.set({"X-Powered-By": "InacapTEAM"})
    next();
})

// Passport
passport.use('local-signin', new LocalStrategy(async function verify(run, password, cb) {
    const data = await UserModel.getByRut(run);
    if(!data) return cb(null, false, { message: 'Incorrect RUN.' });

    const match = await bcrypt.compare(password, data.password);
    if(!match) return cb(null, false, { message: 'Incorrect password.' });

    return cb(null, data.uuid);
}));

passport.use('local-signup', new LocalStrategy({passReqToCallback : true }, 
async function verify(req, run, password, cb) {
    const data_run = await UserModel.getByRut(run);
    const hash = bcrypt.hashSync(password, 10);
    let body_pt = req.body;
    body_pt.password = hash;

    if(data_run) return cb(null, false, { message: 'RUN already registered.' });
    let register_user = await UserModel.pushOne(body_pt);

    return cb(null, register_user.uuid);
}
));

passport.serializeUser((id, done) => {
    done(null, id)
})

passport.deserializeUser(async (id, done) => {
    const data = await UserModel.getById(id);
    done(null, data)
})

// Pages
app.use('/', HomeRoute);
app.use('/auth', AuthRoute);
app.use('/account', UserRoute);

app.use((req, res, next) => {
    res.status(404).json("Cannot GET \""+req.path+"\" route")
})

app.use((err, req, res, next) => {
    res.status(500).json({
        error_name: err.name,
        error_status: err.status,
        error_statusCode: err.statusCode,
        error_code: err.code,
        error_details: err.details,
        error_message: err.message,
        error_stack: err.stack,
    });
})

app.listen(port)