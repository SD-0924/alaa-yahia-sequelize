"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    database: "mydb",
    username: "root",
    password: "123456",
    host: "localhost",
    dialect: "mysql",
});
exports.default = sequelize;
