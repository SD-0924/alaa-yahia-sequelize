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
const userModel_1 = __importDefault(require("../../models/userModel"));
const userController_1 = __importDefault(require("../../controllers/userController"));
// Mock the User model
jest.mock("../../models/userModel");
describe("User Controller", () => {
    let req;
    let res;
    let statusMock;
    let jsonMock;
    beforeEach(() => {
        req = {};
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();
        res = {
            status: statusMock,
            json: jsonMock,
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    // Test for getUsers
    it("should fetch all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const users = [
            { id: 1, username: "user1" },
            { id: 2, username: "user2" },
        ];
        userModel_1.default.findAll.mockResolvedValue(users);
        yield userController_1.default.getUsers(req, res);
        expect(userModel_1.default.findAll).toHaveBeenCalled();
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(users);
    }));
    // Test for createUser
    it("should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            id: 1,
            username: "newUser",
            email: "new@example.com",
            tokenIssuedAt: "2024-11-15T20:56:23.085Z",
        };
        req.body = {
            username: "newUser",
            email: "new@example.com",
            password: "pass123",
            tokenIssuedAt: "2024-11-15T20:56:23.085Z",
        };
        userModel_1.default.create.mockResolvedValue(newUser);
        yield userController_1.default.createUser(req, res);
        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith(newUser);
    }));
    // Test for getUserById
    it("should fetch a user by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { id: 1, username: "user1" };
        req.params = { userId: "1" };
        userModel_1.default.findByPk.mockResolvedValue(user);
        yield userController_1.default.getUserById(req, res);
        expect(userModel_1.default.findByPk).toHaveBeenCalledWith("1");
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(user);
    }));
    it("should return 404 if user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        req.params = { userId: "1" };
        userModel_1.default.findByPk.mockResolvedValue(null);
        yield userController_1.default.getUserById(req, res);
        expect(userModel_1.default.findByPk).toHaveBeenCalledWith("1");
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: "User not found" });
    }));
    // Test for updateUserById
    it("should update a user by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            id: 1,
            username: "user1",
            email: "user1@example.com",
            save: jest.fn().mockResolvedValue(true),
        };
        req.params = { userId: "1" };
        req.body = { username: "updatedUser" };
        userModel_1.default.findByPk.mockResolvedValue(user);
        yield userController_1.default.updateUserById(req, res);
        expect(userModel_1.default.findByPk).toHaveBeenCalledWith("1");
        expect(user.save).toHaveBeenCalled();
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(user);
    }));
    it("should return 404 if user to update is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        req.params = { userId: "1" };
        userModel_1.default.findByPk.mockResolvedValue(null);
        yield userController_1.default.updateUserById(req, res);
        expect(userModel_1.default.findByPk).toHaveBeenCalledWith("1");
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: "User not found" });
    }));
    // Test for deleteUserById
    it("should delete a user by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            id: 1,
            destroy: jest.fn().mockResolvedValue(true),
        };
        req.params = { userId: "1" };
        userModel_1.default.findByPk.mockResolvedValue(user);
        yield userController_1.default.deleteUserById(req, res);
        expect(userModel_1.default.findByPk).toHaveBeenCalledWith("1");
        expect(user.destroy).toHaveBeenCalled();
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith({
            message: "User deleted successfully",
        });
    }));
    it("should return 404 if user to delete is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        req.params = { userId: "1" };
        userModel_1.default.findByPk.mockResolvedValue(null);
        yield userController_1.default.deleteUserById(req, res);
        expect(userModel_1.default.findByPk).toHaveBeenCalledWith("1");
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: "User not found" });
    }));
});
