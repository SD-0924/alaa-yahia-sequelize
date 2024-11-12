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
const process = require("process");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const users = require("../../controllers/userController");
const sequelize_1 = require("sequelize");
jest.mock("../../controllers/userController");
let userId;
const newUser = {
    username: "Alaa yahia user",
    email: "alaaaaa@mail.com",
    password: "123rty@",
};
const sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
});
const MockUser = sequelize.define("user", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
});
describe("User Controller (Mocked)", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.sync();
        // Clear mock data if necessary
        jest.clearAllMocks();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.close();
    }));
    it("should mock the creation of a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = yield MockUser.create(newUser);
        users.createUser.mockResolvedValue(mockUser);
        console.log(users.createUser.mockResolvedValue(mockUser)
            .mockResolvedValue);
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/users").send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.username).toBe(newUser.username);
        userId = response.body.id;
    }));
    it.skip("should mock getting all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUsers = [newUser];
        users.getUsers.mockResolvedValue(mockUsers);
        yield (0, supertest_1.default)(app_1.default)
            .get("/api/users")
            .then((response) => {
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        })
            .catch((error) => {
            throw error;
        });
    }));
    // it("should mock updating the user by id", (done) => {
    //   const updatedUser = { ...newUser, username: "Updated Name" };
    //   (users.updateUser as jest.Mock).mockResolvedValue(updatedUser);
    //   request(app)
    //     .put(`/api/users/${userId}`)
    //     .then((response) => {
    //       expect(response.status).toBe(200);
    //       expect(response.body.username).toBe(updatedUser.username);
    //       done();
    //     })
    //     .catch((error) => done(error));
    // });
    // it("should mock getting the user by id", (done) => {
    //   (users.getUserById as jest.Mock).mockResolvedValue(newUser);
    //   request(app)
    //     .get(`/api/users/${userId}`)
    //     .then((response) => {
    //       expect(response.status).toBe(200);
    //       expect(response.body.username).toBe(newUser.username);
    //       done();
    //     })
    //     .catch((error) => done(error));
    // });
    // it("should mock deleting the user by id", (done) => {
    //   (users.deleteUser as jest.Mock).mockResolvedValue({
    //     message: "User deleted",
    //   });
    //   request(app)
    //     .delete(`/api/users/${userId}`)
    //     .then((response) => {
    //       expect(response.status).toBe(200);
    //       done();
    //     })
    //     .catch((error) => done(error));
    // });
});
