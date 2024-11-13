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
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const userController_1 = __importDefault(require("../../controllers/userController"));
jest.mock("../../controllers/userController", () => ({
    createUser: jest.fn(),
    getUsers: jest.fn(),
    getUserById: jest.fn(),
    updateUserById: jest.fn(),
    deleteUserById: jest.fn(),
}));
let userId;
const newUser = {
    username: "Alaa yahia user",
    email: "alaaaaa@mail.com",
    password: "123rty@",
};
// const MockUser = sequelize.define("user", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW,
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW,
//   },
// }) as typeof User;
describe("User Controller (Mocked)", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Clear mock data if necessary
        jest.clearAllMocks();
    }));
    it("should mock the creation of a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        // const mockUser = await MockUser.create(newUser);
        userController_1.default.createUser.mockResolvedValue(null); //mockUser
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/users").send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.username).toBe(newUser.username);
        userId = response.body.id;
    }));
    // it("should mock getting all users", async () => {
    //   const mockUsers = [newUser];
    //   (users.getUsers as jest.Mock).mockResolvedValue(mockUsers);
    //   await request(app)
    //     .get("/api/users")
    //     .then((response) => {
    //       expect(response.status).toBe(200);
    //       expect(Array.isArray(response.body)).toBe(true);
    //     })
    //     .catch((error) => {
    //       throw error;
    //     });
    // });
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
