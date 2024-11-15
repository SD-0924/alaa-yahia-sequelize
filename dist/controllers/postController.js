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
const postModel_1 = __importDefault(require("../models/postModel"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const commentModel_1 = __importDefault(require("../models/commentModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const postCategoryModelJunction_1 = __importDefault(require("../models/postCategoryModelJunction"));
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
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postModel_1.default.findAll({
            include: [
                { model: userModel_1.default, as: "user", attributes: ["id", "username", "email"] },
                { model: categoryModel_1.default, as: "categories", through: { attributes: [] } },
                {
                    model: commentModel_1.default,
                    as: "comments",
                    include: [
                        { model: userModel_1.default, as: "user", attributes: ["id", "username"] },
                    ],
                },
            ],
        });
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve posts", error });
    }
});
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const post = yield postModel_1.default.findByPk(postId, {
            include: [
                { model: userModel_1.default, as: "user", attributes: ["id", "username", "email"] },
                { model: categoryModel_1.default, as: "categories", through: { attributes: [] } },
                {
                    model: commentModel_1.default,
                    as: "comments",
                    include: [
                        { model: userModel_1.default, as: "user", attributes: ["id", "username"] },
                    ],
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
const updatePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { title, content, userId } = req.body;
        const post = yield postModel_1.default.findByPk(postId);
        if (post && post.userId === userId) {
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
const deletePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { userId } = req.body;
        const deleted = yield postModel_1.default.destroy({ where: { id: postId, userId } });
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
const createCategoryForPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = parseInt(req.params.postId);
        const { categoryName } = req.body;
        const post = yield postModel_1.default.findByPk(postId);
        const [category] = yield categoryModel_1.default.findOrCreate({
            where: { name: categoryName },
        });
        if (post && category) {
            yield postCategoryModelJunction_1.default.create({ postId, categoryId: category.dataValues.id });
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
const getCommentsForPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const post = yield postModel_1.default.findByPk(postId, {
            include: [
                {
                    model: commentModel_1.default,
                    as: "comments",
                    include: [
                        { model: userModel_1.default, as: "user", attributes: ["id", "username"] },
                    ],
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
exports.default = {
    createPost,
    getPosts,
    getPostById,
    getCategoriesForPost,
    getCommentsForPost,
    createCategoryForPost,
    createCommentForPost,
    deletePostById,
    updatePostById,
};
