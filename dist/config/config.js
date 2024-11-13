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
Object.defineProperty(exports, "__esModule", { value: true });
// sequelize-config.js
require("dotenv").config();
const { Sequelize } = require("sequelize");
// Get the current environment (development, test, production)
const environment = process.env.NODE_ENV || "development"; // Default to 'development' if NODE_ENV is not set
// Configuration based on the environment
let dbConfig;
switch (environment) {
    case "production":
        dbConfig = {
            dbName: process.env.PROD_DB_NAME,
            dbUser: process.env.PROD_DB_USER,
            dbPassword: process.env.PROD_DB_PASSWORD,
            dbHost: process.env.PROD_DB_HOST,
        };
        break;
    case "test":
        dbConfig = {
            dbName: process.env.TEST_DB_NAME,
            dbUser: process.env.TEST_DB_USER,
            dbPassword: process.env.TEST_DB_PASSWORD,
            dbHost: process.env.TEST_DB_HOST,
        };
        break;
    default: // development
        dbConfig = {
            dbName: process.env.DB_NAME,
            dbUser: process.env.DB_USER,
            dbPassword: process.env.DB_PASSWORD,
            dbHost: process.env.DB_HOST,
        };
}
const sequelize = new Sequelize(dbConfig.dbName, dbConfig.dbUser, dbConfig.dbPassword, {
    host: dbConfig.dbHost,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: environment === "production" ? false : console.log, // Disable logging in production
    dialectOptions: environment === "production"
        ? {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Use this if you need SSL in production
            },
        }
        : {},
});
// Test the database connection
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log("Database connection has been established successfully.");
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    });
}
testConnection();
exports.default = sequelize;
