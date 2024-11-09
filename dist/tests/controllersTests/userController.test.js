"use strict";
// tests/controllers/userController.test.ts
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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
let userId;
const newUser = {
    username: "Jane Doe",
    email: "jane@example.com",
    password: "password123",
};
describe("User Controller", () => {
    it("should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/users").send(newUser);
        expect(response.status).toBe(201);
        expect(response.body.username).toBe(newUser.username);
        userId = response.body.id;
    }));
    it("should get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/users");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }));
    it("should get the user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/users/" + userId);
        expect(response.status).toBe(201);
        expect(response.body.username).toBe(newUser.username);
    }));
});
