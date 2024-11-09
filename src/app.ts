import express, { Application, Request, Response } from "express";
const routes = require("./routes/routes");
const bodyparser = require("body-parser");

const app: Application = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.set("view engine", "ejs");
app.use(express.static("./public/"));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: any) => {
  res.status(500).send(err.message);
});

app.all("*", (req, res) => {
  res.status(404).send("Pequest not suported");
});

export default app;
