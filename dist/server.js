"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql = require("mysql2");
const app = (0, express_1.default)();
const port = 3000;
// MySQL Connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    //   database: "mydb",
});
db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        process.exit(1);
    }
    console.log("Connected to MySQL");
});
app.get("/createdb", (req, res) => {
    const sql = "CREATE DATABASE IF NOT EXISTS mydb";
    db.query(sql, (err) => {
        if (err)
            return res.status(500).send("Error creating database: " + err.message);
        res.send("Database created!");
    });
});
app.get("/createUserTable", (req, res) => {
    const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
    db.query(sql, (err) => {
        if (err)
            return res.status(500).send("Error creating table: " + err.message);
        res.send("Users table created!");
    });
});
app.get("/addUser", (req, res) => {
    const user = { name: "John Doe", email: "john@example.com" };
    const sql = "INSERT INTO users SET ?";
    db.query(sql, user, (err) => {
        if (err)
            return res.status(500).send("Error inserting user: " + err.message);
        res.send("User added!");
    });
});
app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, results) => {
        if (err)
            return res.status(500).send("Error fetching users: " + err.message);
        res.json(results);
    });
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
process.on("SIGINT", () => {
    db.end((err) => {
        if (err)
            console.error("Error closing MySQL connection:", err);
        console.log("MySQL connection closed");
        process.exit();
    });
});
