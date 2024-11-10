"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const { Sequelize } = require("sequelize");
// Set up different database connections based on environment
const sequelize = new Sequelize(process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_NAME
    : process.env.DB_NAME, process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_USER
    : process.env.DB_USER, process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_PASSWORD
    : process.env.DB_PASSWORD, {
    host: process.env.NODE_ENV === "test"
        ? process.env.TEST_DB_HOST
        : process.env.DB_HOST,
    dialect: "mysql",
});
exports.default = sequelize;
