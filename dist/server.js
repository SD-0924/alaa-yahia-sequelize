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
const app_1 = __importDefault(require("./app"));
// const bodyparser = require("body-parser");
const config_1 = __importDefault(require("./config/config"));
// const routes = require("./routes/routes");
// const app = express();
// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());
// app.set("view engine", "ejs");
// app.use(express.static("./public/"));
// const port: number = 3000;
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", process.env);
let sequelizeDB = process.env.NODE_ENV == "test" ? config_1.default.test : config_1.default.development;
const PORT = process.env.PORT || 3000;
// app.use(routes);
// app.use((err: Error, req: Request, res: Response, next: any) => {
//   res.status(500).send(err.message);
// });
// app.all("*", (req, res) => {
//   res.status(404).send("Pequest not suported");
// });
const createDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelizeDB.query(`CREATE DATABASE IF NOT EXISTS mydb;`);
        console.log(`Database "mydb" created or already exists.`);
        // await sequelizeDB.close();
    }
    catch (error) {
        console.error("Error creating database:", error);
        throw error;
    }
});
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createDatabase();
        yield sequelizeDB.authenticate();
        console.log("Database connection has been established successfully.");
        yield sequelizeDB.sync({ alter: true });
        console.log("All models were synchronized successfully.");
        yield sequelizeDB.close();
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
app_1.default.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield initializeDatabase();
    console.log(`Server is running on port ${PORT}`);
}));
