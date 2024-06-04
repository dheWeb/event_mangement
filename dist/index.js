"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const User_1 = require("./model/User");
const signup_1 = require("./controller/signup");
const login_1 = require("./controller/login");
const Event_1 = require("./model/Event");
const Event_2 = require("./controller/Event");
const Booking_1 = require("./model/Booking");
const Booking_2 = require("./controller/Booking");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AppDataSource = new typeorm_1.DataSource({
            type: 'mysql',
            host: '185.199.52.88',
            port: 3306,
            username: 'epsarvatrco_ep',
            password: "Sarvatr@12345",
            database: 'epsarvatrco_tudu',
            // host: 'localhost',
            //  port: 3306,
            //  username: 'root',
            //  password: undefined,
            //  database: 'my_database1',
            entities: [
                User_1.User,
                Event_1.Event,
                Booking_1.Booking
            ],
            synchronize: true,
        });
        AppDataSource.initialize()
            .then(() => {
            console.log("Data Source has been initialized!");
        })
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        console.log('Connected to Mysql');
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use(signup_1.signupRouter);
        app.use(login_1.loginRouter);
        app.use(Event_2.createEventRouter);
        app.use(Booking_2.BookingRouter);
        app.listen(process.env.PORT || 8080, () => {
            console.log('Now running on port 8080');
        });
    }
    catch (error) {
        console.error(error);
        throw new Error('Unable to connect to db');
    }
});
main();
