"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mysql = require("mysql");
exports.app = (0, express_1.default)();
// const routes = require("./routes/routes");
exports.app.set("view engine", "ejs");
exports.app.use(express_1.default.static("./public/"));
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "alaayahia",
    password: "123456",
    database: "mydb",
});
// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to MySQL as ID " + db.threadId);
});
const port = 3000;
let server;
exports.app.get("/", (req, res) => {
    res.send("nome page");
});
// app.use(routes);
exports.app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});
exports.app.all("*", (req, res) => {
    res.status(404).send("Pequest not suported");
});
server = exports.app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
