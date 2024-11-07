"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const mysql = require("mysql2");
const app = (0, express_1.default)();
const routes = require("./routes/routes");
app.set("view engine", "ejs");
app.use(express_1.default.static("./public/"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const port = 3000;
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
});
db.connect((err) => {
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
app.use(routes);
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});
app.all("*", (req, res) => {
    res.status(404).send("Pequest not suported");
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield config_1.default.authenticate();
        console.log("Database connection has been established successfully.");
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}))();
process.on("SIGINT", () => {
    db.end((err) => {
        if (err)
            console.error("Error closing MySQL connection:", err);
        console.log("MySQL connection closed");
        process.exit();
    });
});
