import express, { Request, Response } from "express";
const bodyparser = require("body-parser");
import sequelize from "./config/config";
const mysql = require("mysql2");
const routes = require("./routes/routes");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.set("view engine", "ejs");
app.use(express.static("./public/"));

const port: number = 3000;

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
});

db.connect((err: any) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL");
});

// app.get("/createdb", (req: Request, res: Response) => {
//   const sql = "CREATE DATABASE IF NOT EXISTS mydb";
//   db.query(sql, (err: { message: string }) => {
//     if (err)
//       return res.status(500).send("Error creating database: " + err.message);
//     res.send("Database created!");
//   });
// });

//drop the db then create user table

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: any) => {
  res.status(500).send(err.message);
});

app.all("*", (req, res) => {
  res.status(404).send("Pequest not suported");
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

process.on("SIGINT", () => {
  db.end((err: any) => {
    if (err) console.error("Error closing MySQL connection:", err);
    console.log("MySQL connection closed");
    process.exit();
  });
});
