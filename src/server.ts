// import express, { Request, Response } from "express";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import app from "./app";
// const bodyparser = require("body-parser");
import sequelize from "./config/config";
// const routes = require("./routes/routes");

// const app = express();

// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());
// app.set("view engine", "ejs");
// app.use(express.static("./public/"));

// const port: number = 3000;

const sequelizeDB: Sequelize = sequelize;
const PORT = process.env.PORT || 3000;

// app.use(routes);

// app.use((err: Error, req: Request, res: Response, next: any) => {
//   res.status(500).send(err.message);
// });

// app.all("*", (req, res) => {
//   res.status(404).send("Pequest not suported");
// });

const createDatabase = async () => {
  try {
    await sequelizeDB.query(
      `CREATE DATABASE IF NOT EXISTS ${sequelizeDB.getDatabaseName()};`
    );
    console.log(
      `Database "${sequelizeDB.getDatabaseName()}" created or already exists.`
    );

    // await sequelizeDB.close();
  } catch (error) {
    console.error("Error creating database:", error);
    throw error;
  }
};

const initializeDatabase = async () => {
  try {
    await createDatabase();

    await sequelizeDB.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelizeDB.sync({ alter: true });
    console.log("All models were synchronized successfully.");
    await sequelizeDB.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`Server is running on port ${PORT}`);
});
