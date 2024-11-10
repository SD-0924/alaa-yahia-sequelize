"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = require("./routes/routes");
const bodyparser = require("body-parser");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
console.log(">>>>>>>>>>>>app>>>>>>>>>>>>", process.env.NODE_ENV);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.set("view engine", "ejs");
app.use(express_1.default.static("./public/"));
app.use(routes);
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});
app.all("*", (req, res) => {
    res.status(404).send("Pequest not suported");
});
exports.default = app;
