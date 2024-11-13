"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(routes_1.default);
// app.use((err: Error, req: Request, res: Response, next: any) => {
//   res.status(500).send(err.message);
// });
// app.all("*", (req, res) => {
//   res.status(404).send("Pequest not suported");
// });
exports.default = app;
