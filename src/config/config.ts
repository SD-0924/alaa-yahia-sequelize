import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "mydb",
  username: "root",
  password: "123456",
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
