"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// const sequelize = new Sequelize({
//   database: "mydb",
//   username: "root",
//   password: "123456",
//   host: "localhost",
//   dialect: "mysql",
// });
const config = {
    development: new sequelize_1.Sequelize({
        database: "mydb",
        username: "root",
        password: "123456",
        host: "localhost",
        dialect: "mysql",
    }),
    test: new sequelize_1.Sequelize({
        database: process.env.DB_NAME || "test_db",
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "test_password",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: "mysql",
        logging: false,
    }),
};
exports.default = config;
// export default sequelize;
