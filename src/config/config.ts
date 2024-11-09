import { Sequelize } from "sequelize";

// const sequelize = new Sequelize({
//   database: "mydb",
//   username: "root",
//   password: "123456",
//   host: "localhost",
//   dialect: "mysql",
// });

const config = {
  development: new Sequelize({
    database: "mydb",
    username: "root",
    password: "123456",
    host: "localhost",
    dialect: "mysql",
  }),
  test: new Sequelize({
    database: "test_db", // process.env.DB_NAME ||
    username: "root", //process.env.DB_USER ||
    password: "test_password", //process.env.DB_PASSWORD ||
    host: "127.0.0.1", //process.env.DB_HOST ||
    dialect: "mysql",
    logging: false,
  }),
};

export default config;
// export default sequelize;
