"use strict";
// require("dotenv").config();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
require("./models/associations");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(routes_1.default);
app.use((err, req, res, next) => {
    if (err) {
        if (err.name === "JsonWebTokenError") {
            res.status(401).json({ message: "Invalid token." });
        }
        if (err.name === "TokenExpiredError") {
            res.status(401).json({ message: "Token expired." });
        }
    }
    res.status(500).send(err.message);
    next(err);
});
app.all("*", (req, res) => {
    res.status(404).send("Request not supported");
});
exports.default = app;
