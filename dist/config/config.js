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
        database: "test_db", // process.env.DB_NAME ||
        username: "root", //process.env.DB_USER ||
        password: "test_password", //process.env.DB_PASSWORD ||
        host: "127.0.0.1", //process.env.DB_HOST ||
        dialect: "mysql",
        logging: false,
    }),
};
exports.default = config;
// export default sequelize;
