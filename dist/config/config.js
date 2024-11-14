"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// sequelize-config.js
// require("dotenv").config();
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
    dialect: "mysql",
    logging: environment === "production" ? false : console.log, // Disable logging in production
});
// Test the database connection
// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log("Database connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }
// testConnection();
exports.default = sequelize;
