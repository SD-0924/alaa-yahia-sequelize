"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app")); // Assuming you need to keep this to use app routes
const users = require("../../controllers/userController");
jest.mock("../../controllers/userController"); // Mocking the controller
let userId;
const newUser = {
    username: "Alaa yahia user",
    email: "alaaaaa@mail.com",
    password: "123rty@",
};
describe("User Controller (Mocked)", () => {
    beforeAll(() => {
        // Clear mock data if necessary
        jest.clearAllMocks();
    });
    it("should mock the creation of a new user", (done) => {
        const mockUser = Object.assign({ id: 1 }, newUser);
        users.createUser.mockResolvedValue(mockUser);
        (0, supertest_1.default)(app_1.default)
            .post("/api/users")
            .send(newUser)
            .then((response) => {
            expect(response.status).toBe(201);
            expect(response.body.username).toBe(newUser.username);
            userId = response.body.id;
            done(); // Call done() after assertions
        })
            .catch((error) => done(error)); // Pass errors to done() to handle failures
    });
    it("should mock getting all users", (done) => {
        const mockUsers = [newUser];
        users.getAllUsers.mockResolvedValue(mockUsers);
        (0, supertest_1.default)(app_1.default)
            .get("/api/users")
            .then((response) => {
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            done();
        })
            .catch((error) => done(error));
    });
    it("should mock updating the user by id", (done) => {
        const updatedUser = Object.assign(Object.assign({}, newUser), { username: "Updated Name" });
        users.updateUser.mockResolvedValue(updatedUser);
        (0, supertest_1.default)(app_1.default)
            .put(`/api/users/${userId}`)
            .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body.username).toBe(updatedUser.username);
            done();
        })
            .catch((error) => done(error));
    });
    it("should mock getting the user by id", (done) => {
        users.getUserById.mockResolvedValue(newUser);
        (0, supertest_1.default)(app_1.default)
            .get(`/api/users/${userId}`)
            .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body.username).toBe(newUser.username);
            done();
        })
            .catch((error) => done(error));
    });
    it("should mock deleting the user by id", (done) => {
        users.deleteUser.mockResolvedValue({
            message: "User deleted",
        });
        (0, supertest_1.default)(app_1.default)
            .delete(`/api/users/${userId}`)
            .then((response) => {
            expect(response.status).toBe(200);
            done();
        })
            .catch((error) => done(error));
    });
});
