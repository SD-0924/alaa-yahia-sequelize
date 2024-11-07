import express, { Request, Response } from "express";
import { dbConfig } from "./config/config";
const mysql = require("mysql2");

const app = express();
const routes = require("./routes/routes");

app.set("view engine", "ejs");

app.use(express.static("./public/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port: number = 3000;

const db = mysql.createConnection(dbConfig);

db.connect((err: any) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL");
});

app.get("/createdb", (req: Request, res: Response) => {
  const sql = "CREATE DATABASE IF NOT EXISTS mydb";
  db.query(sql, (err: { message: string }) => {
    if (err)
      return res.status(500).send("Error creating database: " + err.message);
    res.send("Database created!");
  });
});

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: any) => {
  res.status(500).send(err.message);
});

app.all("*", (req, res) => {
  res.status(404).send("Pequest not suported");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

process.on("SIGINT", () => {
  db.end((err: any) => {
    if (err) console.error("Error closing MySQL connection:", err);
    console.log("MySQL connection closed");
    process.exit();
  });
});
