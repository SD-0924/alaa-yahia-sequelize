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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const sequelizeDB = config_1.default;
const PORT = process.env.PORT || 3000;
const createDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelizeDB.query(`CREATE DATABASE IF NOT EXISTS ${sequelizeDB.getDatabaseName()};`);
        console.log(`Database "${sequelizeDB.getDatabaseName()}" created or already exists.`);
    }
    catch (error) {
        console.error("Error creating database:", error);
        throw error;
    }
});
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createDatabase();
        yield sequelizeDB.authenticate();
        console.log("Database connection has been established successfully.");
        yield sequelizeDB.sync({ alter: true });
        console.log("All models were synchronized successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
app_1.default.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield initializeDatabase();
    console.log(`Server is running on port ${PORT}`);
}));
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Gracefully shutting down...");
    yield sequelizeDB.close();
    console.log("Database connection closed.");
    process.exit(0);
}));
