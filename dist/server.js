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
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const bodyparser = require("body-parser");
const config_1 = __importDefault(require("./config/config"));
const routes = require("./routes/routes");
const app = (0, express_1.default)();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.set("view engine", "ejs");
app.use(express_1.default.static("./public/"));
const port = 3000;
app.use(routes);
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});
app.all("*", (req, res) => {
    res.status(404).send("Pequest not suported");
});
const createDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sequelizeWithoutDb = new sequelize_1.Sequelize({
            host: "127.0.0.1",
            username: "root",
            password: "123456",
            dialect: "mysql",
            logging: false,
        });
        yield sequelizeWithoutDb.query(`CREATE DATABASE IF NOT EXISTS mydb;`);
        console.log(`Database "mydb" created or already exists.`);
        yield sequelizeWithoutDb.close();
    }
    catch (error) {
        console.error("Error creating database:", error);
        throw error;
    }
});
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createDatabase();
        yield config_1.default.authenticate();
        console.log("Database connection has been established successfully.");
        yield config_1.default.sync({ alter: true });
        console.log("All models were synchronized successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield initializeDatabase();
    console.log(`Server is running on port ${port}`);
}));
