import express, { Request, Response } from "express";
const mysql = require("mysql");

export const app = express();
// const routes = require("./routes/routes");

app.set("view engine", "ejs");

app.use(express.static("./public/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "alaayahia",
  password: "123456",
  database: "mydb",
});

// Connect to MySQL
db.connect((err: Error) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL as ID " + db.threadId);
});

const port: number = 3000;
let server: any;

app.get("/", (req: Request, res: Response) => {
  res.send("nome page");
});

// app.use(routes);

app.use((err: Error, req: Request, res: Response, next: any) => {
  res.status(500).send(err.message);
});
app.all("*", (req, res) => {
  res.status(404).send("Pequest not suported");
});

server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
