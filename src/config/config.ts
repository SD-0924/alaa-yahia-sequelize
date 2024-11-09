import { Sequelize } from "sequelize";

const config = {
  development: new Sequelize({
    database: "mydb",
    username: "root",
    password: "123456",
    host: "localhost",
    dialect: "mysql",
  }),
  test: new Sequelize({
    database: "test_db",
    username: "root",
    password: "test_password",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  }),
};

export default config;
// export default sequelize;
