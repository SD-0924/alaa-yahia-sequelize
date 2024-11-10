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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
let postId;
let userId;
const newUser = {
    username: "Alaa Yahia",
    email: "alaayahia@mail.com",
    password: "123qwe!",
};
const newPost = {
    title: "first post",
    content: "first post content",
};
const newCategory = {
    categoryName: "Backend",
};
const newComment = {
    content: "new comment",
};
describe("Post Controller", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const userResponse = yield (0, supertest_1.default)(app_1.default).post("/api/users").send(newUser);
        userId = userResponse.body.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).delete(`/api/users/${userId}`);
    }));
    it("should create a new post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/posts")
            .send(Object.assign(Object.assign({}, newPost), { userId }));
        expect(response.status).toBe(201);
        expect(response.body.title).toBe(newPost.title);
        postId = response.body.id;
    }));
    it("should retrieve all posts with associated users, categories, and comments", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/posts");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }));
    it("should retrieve a specific post by ID with associated data", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/api/posts/${postId}`);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(newPost.title);
    }));
    it("should update a post by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedPost = {
            title: "Updated Post",
            content: "Updated content",
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/posts/${postId}`)
            .send(updatedPost);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(updatedPost.title);
    }));
    it("should delete a post by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/api/posts/${postId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Post deleted successfully");
    }));
    it("should create a category for a post", () => __awaiter(void 0, void 0, void 0, function* () {
        const postResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/api/posts")
            .send(Object.assign(Object.assign({}, newPost), { userId }));
        postId = postResponse.body.id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/posts/${postId}/categories`)
            .send(newCategory);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Category added to post successfully");
    }));
    it("should retrieve categories for a specific post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/api/posts/${postId}/categories`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }));
    it("should create a comment for a post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/posts/${postId}/comments`)
            .send(Object.assign(Object.assign({}, newComment), { userId }));
        expect(response.status).toBe(201);
        expect(response.body.content).toBe(newComment.content);
    }));
    it("should retrieve comments for a specific post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/api/posts/${postId}/comments`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }));
});
