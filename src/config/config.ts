const { Sequelize } = require("sequelize");

const args = {
  dbName:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_NAME
      : process.env.DB_NAME,
  user:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_USER
      : process.env.DB_USER,
  password:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_PASSWORD
      : process.env.DB_PASSWORD,
  host:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_HOST
      : process.env.DB_HOST,
};

const sequelize = new Sequelize(args.dbName, args.user, args.password, {
  host: args.host,
  dialect: "mysql",
});

export default sequelize;
