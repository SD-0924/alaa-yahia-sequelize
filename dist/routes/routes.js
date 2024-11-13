"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const userController_1 = __importDefault(require("../controllers/userController"));
const postController_1 = __importDefault(require("../controllers/postController"));
/**User Routes*/
router.get(
// Get all users
"/api/users", userController_1.default.getUsers);
router.post(
// Create a new user
"/api/users", userController_1.default.createUser);
router.get(
// Get user by ID
"/api/users/:userId", userController_1.default.getUserById);
router.put(
// Update user by ID
"/api/users/:userId", userController_1.default.updateUserById);
router.delete(
// Delete user by ID
"/api/users/:userId", userController_1.default.deleteUserById);
/**Posts Routes*/
router.post(
// Create a new post
"/api/posts", postController_1.default.createPost);
router.get(
// Get all posts with associated users, categories, and comments
"/api/posts", postController_1.default.getPosts);
router.get(
// Get post by ID with associated users, categories, and comments
"/api/posts/:postId", postController_1.default.getPostById);
router.put(
// Update post by ID
"/api/posts/:postId", postController_1.default.updatePostById);
router.delete(
// Delete post by ID
"/api/posts/:postId", postController_1.default.deletePostById);
/**Category Routes*/
router.post(
// Create a new category for a post
"/api/posts/:postId/categories", postController_1.default.createCategoryForPost);
router.get(
// Get categories for a specific post
"/api/posts/:postId/categories", postController_1.default.getCategoriesForPost);
/**Comments Routes*/
router.post(
// Create a new comment for a post
"/api/posts/:postId/comments", postController_1.default.createCommentForPost);
router.get(
// Get comments for a specific post
"/api/posts/:postId/comments", postController_1.default.getCommentsForPost);
exports.default = router;
