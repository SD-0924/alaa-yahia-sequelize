"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const mysql = require("mysql2");
const app = (0, express_1.default)();
const routes = require("./routes/routes");
app.set("view engine", "ejs");
app.use(express_1.default.static("./public/"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const port = 3000;
const db = mysql.createConnection(config_1.dbConfig);
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
app.use(routes);
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});
app.all("*", (req, res) => {
    res.status(404).send("Pequest not suported");
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
