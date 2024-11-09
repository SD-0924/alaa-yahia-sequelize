// import express, { Request, Response } from "express";
import { Sequelize } from "sequelize";
import app from "./app";
// const bodyparser = require("body-parser");
import sequelize from "./config/config";
// const routes = require("./routes/routes");

// const app = express();

// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());
// app.set("view engine", "ejs");
// app.use(express.static("./public/"));

const port: number = 3000;

// app.use(routes);

// app.use((err: Error, req: Request, res: Response, next: any) => {
//   res.status(500).send(err.message);
// });

// app.all("*", (req, res) => {
//   res.status(404).send("Pequest not suported");
// });

const createDatabase = async () => {
  try {
    const sequelizeWithoutDb = new Sequelize({
      host: "127.0.0.1",
      username: "root",
      password: "123456",
      dialect: "mysql",
      logging: false,
    });

    await sequelizeWithoutDb.query(`CREATE DATABASE IF NOT EXISTS mydb;`);
    console.log(`Database "mydb" created or already exists.`);

    await sequelizeWithoutDb.close();
  } catch (error) {
    console.error("Error creating database:", error);
    throw error;
  }
};

const initializeDatabase = async () => {
  try {
    await createDatabase();

    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

app.listen(port, async () => {
  await initializeDatabase();
  console.log(`Server is running on port ${port}`);
});
