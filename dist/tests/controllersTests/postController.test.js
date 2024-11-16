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
const postController_1 = __importDefault(require("../../controllers/postController"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const postModel_1 = __importDefault(require("../../models/postModel"));
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const commentModel_1 = __importDefault(require("../../models/commentModel"));
const postCategoryModelJunction_1 = __importDefault(require("../../models/postCategoryModelJunction"));
jest.mock("../../models/userModel");
jest.mock("../../models/postModel");
jest.mock("../../models/categoryModel");
jest.mock("../../models/commentModel");
jest.mock("../../models/postCategoryModelJunction");
describe("Post Controller", () => {
    let req;
    let res;
    let jsonSpy;
    let statusSpy;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jsonSpy = jest.spyOn(res, "json");
        statusSpy = jest.spyOn(res, "status");
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("createPost", () => {
        it("should create a new post", () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = { title: "New Post", content: "Post content", userId: 1 };
            postModel_1.default.create.mockResolvedValue(req.body);
            yield postController_1.default.createPost(req, res);
            expect(postModel_1.default.create).toHaveBeenCalledWith(req.body);
            expect(statusSpy).toHaveBeenCalledWith(201);
            expect(jsonSpy).toHaveBeenCalledWith(req.body);
        }));
    });
    describe("getPosts", () => {
        it("should retrieve all posts", () => __awaiter(void 0, void 0, void 0, function* () {
            const posts = [{ id: 1, title: "Post 1" }];
            postModel_1.default.findAll.mockResolvedValue(posts);
            yield postController_1.default.getPosts(req, res);
            expect(postModel_1.default.findAll).toHaveBeenCalled();
            expect(statusSpy).toHaveBeenCalledWith(200);
            expect(jsonSpy).toHaveBeenCalledWith(posts);
        }));
    });
    describe("getPostById", () => {
        it("should retrieve a post by ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const post = { id: 1, title: "Post 1" };
            req.params = { postId: "1" };
            postModel_1.default.findByPk.mockResolvedValue(post);
            yield postController_1.default.getPostById(req, res);
            expect(postModel_1.default.findByPk).toHaveBeenCalledWith("1", expect.any(Object));
            expect(statusSpy).toHaveBeenCalledWith(200);
            expect(jsonSpy).toHaveBeenCalledWith(post);
        }));
        it("should return 404 if post is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { postId: "1" };
            postModel_1.default.findByPk.mockResolvedValue(null);
            yield postController_1.default.getPostById(req, res);
            expect(statusSpy).toHaveBeenCalledWith(404);
            expect(jsonSpy).toHaveBeenCalledWith({ message: "Post not found" });
        }));
    });
    describe("getCategoriesForPost", () => {
        it("should retrieve categories for a post", () => __awaiter(void 0, void 0, void 0, function* () {
            const post = { categories: [{ id: 1, name: "Category 1" }] };
            req.params = { postId: "1" };
            postModel_1.default.findByPk.mockResolvedValue(post);
            yield postController_1.default.getCategoriesForPost(req, res);
            expect(postModel_1.default.findByPk).toHaveBeenCalledWith("1", expect.any(Object));
            expect(statusSpy).toHaveBeenCalledWith(200);
            expect(jsonSpy).toHaveBeenCalledWith(post.categories);
        }));
    });
    describe("getCommentsForPost", () => {
        it("should retrieve comments for a post", () => __awaiter(void 0, void 0, void 0, function* () {
            const post = { comments: [{ id: 1, content: "Comment 1" }] };
            req.params = { postId: "1" };
            postModel_1.default.findByPk.mockResolvedValue(post);
            yield postController_1.default.getCommentsForPost(req, res);
            expect(postModel_1.default.findByPk).toHaveBeenCalledWith("1", expect.any(Object));
            expect(statusSpy).toHaveBeenCalledWith(200);
            expect(jsonSpy).toHaveBeenCalledWith(post.comments);
        }));
    });
    describe("createCategoryForPost", () => {
        it("should add a category to a post", () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { postId: "1" };
            req.body = { categoryName: "New Category" };
            postModel_1.default.findByPk.mockResolvedValue({});
            categoryModel_1.default.findOrCreate.mockResolvedValue([
                { dataValues: { id: 2 } },
            ]);
            postCategoryModelJunction_1.default.create.mockResolvedValue({});
            yield postController_1.default.createCategoryForPost(req, res);
            expect(postModel_1.default.findByPk).toHaveBeenCalledWith(1);
            expect(categoryModel_1.default.findOrCreate).toHaveBeenCalledWith({
                where: { name: "New Category" },
            });
            expect(postCategoryModelJunction_1.default.create).toHaveBeenCalledWith({
                postId: 1,
                categoryId: 2,
            });
            expect(statusSpy).toHaveBeenCalledWith(201);
            expect(jsonSpy).toHaveBeenCalledWith({
                message: "Category added to post successfully",
            });
        }));
    });
    describe("createCommentForPost", () => {
        it("should create a comment for a post", () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { postId: "1" };
            req.body = { content: "New Comment", userId: 1 };
            userModel_1.default.findByPk.mockResolvedValue({});
            postModel_1.default.findByPk.mockResolvedValue({});
            commentModel_1.default.create.mockResolvedValue({});
            yield postController_1.default.createCommentForPost(req, res);
            expect(commentModel_1.default.create).toHaveBeenCalledWith({
                content: "New Comment",
            });
            expect(statusSpy).toHaveBeenCalledWith(201);
        }));
    });
    describe("deletePostById", () => {
        it("should delete a post by ID", () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { postId: "1" };
            req.body = { userId: "1" };
            postModel_1.default.destroy.mockResolvedValue(1);
            yield postController_1.default.deletePostById(req, res);
            expect(postModel_1.default.destroy).toHaveBeenCalledWith({
                where: { id: "1", userId: "1" },
            }); //
            expect(statusSpy).toHaveBeenCalledWith(200);
            expect(jsonSpy).toHaveBeenCalledWith({
                message: "Post deleted successfully",
            });
        }));
        it("should return 404 if post not found", () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { postId: "1" };
            req.body = { userId: "1" };
            postModel_1.default.destroy.mockResolvedValue(0);
            yield postController_1.default.deletePostById(req, res);
            expect(statusSpy).toHaveBeenCalledWith(404);
            expect(jsonSpy).toHaveBeenCalledWith({ message: "Post not found" });
        }));
    });
    describe("updatePostById", () => {
        it("should update a post by ID", () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { postId: "1" };
            req.body = { title: "Updated Title", content: "Updated Content" };
            const post = { save: jest.fn(), title: "", content: "" };
            postModel_1.default.findByPk.mockResolvedValue(post);
            yield postController_1.default.updatePostById(req, res);
            expect(postModel_1.default.findByPk).toHaveBeenCalledWith("1");
            expect(post.title).toBe("Updated Title");
            expect(post.content).toBe("Updated Content");
            expect(post.save).toHaveBeenCalled();
            expect(statusSpy).toHaveBeenCalledWith(200);
            expect(jsonSpy).toHaveBeenCalledWith(post);
        }));
    });
});
