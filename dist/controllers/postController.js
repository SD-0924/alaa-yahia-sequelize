"use strict";
// src/controllers/PostController.ts
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
exports.getCommentsForPost = exports.createCommentForPost = exports.getCategoriesForPost = exports.createCategoryForPost = exports.deletePostById = exports.updatePostById = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const commentModel_1 = __importDefault(require("../models/commentModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const postCategoryModelJunction_1 = __importDefault(require("../models/postCategoryModelJunction"));
// Create a new post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, userId } = req.body;
        const newPost = yield postModel_1.default.create({ title, content, userId });
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create post", error });
    }
});
exports.createPost = createPost;
// Get all posts with associated users, categories, and comments
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postModel_1.default.findAll({
            include: [
                { model: userModel_1.default, as: "user", attributes: ["id", "name", "email"] },
                { model: categoryModel_1.default, as: "categories", through: { attributes: [] } },
                {
                    model: commentModel_1.default,
                    as: "comments",
                    include: [{ model: userModel_1.default, as: "user", attributes: ["id", "name"] }],
                },
            ],
        });
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve posts", error });
    }
});
exports.getPosts = getPosts;
// Get post by ID with associated users, categories, and comments
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield postModel_1.default.findByPk(id, {
            include: [
                { model: userModel_1.default, as: "user", attributes: ["id", "name", "email"] },
                { model: categoryModel_1.default, as: "categories", through: { attributes: [] } },
                {
                    model: commentModel_1.default,
                    as: "comments",
                    include: [{ model: userModel_1.default, as: "user", attributes: ["id", "name"] }],
                },
            ],
        });
        if (post) {
            res.status(200).json(post);
        }
        else {
            res.status(404).json({ message: "Post not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve post", error });
    }
});
exports.getPostById = getPostById;
// Update post by ID
const updatePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = yield postModel_1.default.findByPk(id);
        if (post) {
            post.title = title;
            post.content = content;
            yield post.save();
            res.status(200).json(post);
        }
        else {
            res.status(404).json({ message: "Post not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update post", error });
    }
});
exports.updatePostById = updatePostById;
// Delete post by ID
const deletePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield postModel_1.default.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: "Post deleted successfully" });
        }
        else {
            res.status(404).json({ message: "Post not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete post", error });
    }
});
exports.deletePostById = deletePostById;
// Create a new category for a post
const createCategoryForPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, categoryId } = req.body;
        const post = yield postModel_1.default.findByPk(postId);
        const category = yield categoryModel_1.default.findByPk(categoryId);
        if (post && category) {
            yield postCategoryModelJunction_1.default.create({ postId, categoryId });
            res.status(201).json({ message: "Category added to post successfully" });
        }
        else {
            res.status(404).json({ message: "Post or Category not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add category to post", error });
    }
});
exports.createCategoryForPost = createCategoryForPost;
// Get categories for a specific post
const getCategoriesForPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const post = yield postModel_1.default.findByPk(postId, {
            include: [
                { model: categoryModel_1.default, as: "categories", through: { attributes: [] } },
            ],
        });
        if (post) {
            res.status(200).json(post.categories);
        }
        else {
            res.status(404).json({ message: "Post not found" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to retrieve categories for post", error });
    }
});
exports.getCategoriesForPost = getCategoriesForPost;
// Create a new comment for a post
const createCommentForPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { content, userId } = req.body;
        const post = yield postModel_1.default.findByPk(postId);
        const user = yield userModel_1.default.findByPk(userId);
        if (post && user) {
            const comment = yield commentModel_1.default.create({
                content,
                postId: post.id,
                userId: user.id,
            });
            res.status(201).json(comment);
        }
        else {
            res.status(404).json({ message: "Post or User not found" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to create comment for post", error });
    }
});
exports.createCommentForPost = createCommentForPost;
// Get comments for a specific post
const getCommentsForPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const post = yield postModel_1.default.findByPk(postId, {
            include: [
                {
                    model: commentModel_1.default,
                    as: "comments",
                    include: [{ model: userModel_1.default, as: "user", attributes: ["id", "name"] }],
                },
            ],
        });
        if (post) {
            res.status(200).json(post.comments);
        }
        else {
            res.status(404).json({ message: "Post not found" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to retrieve comments for post", error });
    }
});
exports.getCommentsForPost = getCommentsForPost;
