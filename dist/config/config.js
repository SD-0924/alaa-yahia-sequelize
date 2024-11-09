"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config = {
    development: new sequelize_1.Sequelize({
        database: "mydb",
        username: "root",
        password: "123456",
        host: "localhost",
        dialect: "mysql",
    }),
    test: new sequelize_1.Sequelize({
        database: "test_db",
        username: "root",
        password: "test_password",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false,
    }),
};
exports.default = config;
// export default sequelize;
