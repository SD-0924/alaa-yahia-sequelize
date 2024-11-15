// require("dotenv").config();

import express, { Application, Request, Response, NextFunction } from "express";
import router from "./routes/routes";
import "./models/associations";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.use((err: any, req: Request, res: Response, next: any) => {
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

export default app;
