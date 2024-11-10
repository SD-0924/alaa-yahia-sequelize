"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Sequelize } = require("sequelize");
console.log("444444444444444444444444", process.env.NODE_ENV, process.env.TEST_DB_NAME);
// Set up different database connections based on environment
const args = {
    dbName: process.env.TEST_DB_NAME,
    user: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    host: process.env.TEST_DB_HOST,
};
console.log("444444444444444444444444", args.dbName);
const sequelize = new Sequelize(args.dbName, args.user, args.password, {
    host: args.host,
    dialect: "mysql",
});
console.log("444444444444444444444444", sequelize.getDatabaseName());
exports.default = sequelize;
