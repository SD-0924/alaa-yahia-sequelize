const { Sequelize } = require("sequelize");

const environment = process.env.NODE_ENV || "development";
let dbConfig;

switch (environment.toString().trim()) {
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

const sequelize = new Sequelize(
  dbConfig.dbName,
  dbConfig.dbUser,
  dbConfig.dbPassword,
  {
    host: dbConfig.dbHost,
    dialect: "mysql",
    port: process.env.host,
    logging: environment === "production" ? false : console.log, // Disable logging in production
  }
);

export default sequelize;
