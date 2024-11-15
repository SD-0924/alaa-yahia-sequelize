"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const userController_1 = __importDefault(require("../controllers/userController"));
const postController_1 = __importDefault(require("../controllers/postController"));
const validatorMiddlewares_1 = require("../middlewares/validatorMiddlewares");
const authenticateJWT_1 = require("../middlewares/authenticateJWT");
/**Auth Routes*/
router.post("/api/auth/login", validatorMiddlewares_1.userValidationRules.loginUser, // Add validation for login credentials
userController_1.default.loginUser);
/**User Routes*/
router.get(
// Get all users
"/api/users", //body: empty
userController_1.default.getUsers);
router.post(
// Create a new user
"/api/users", //body: username, email, password.
validatorMiddlewares_1.userValidationRules.createUser, userController_1.default.createUser);
router.get(
// Get user by ID
"/api/users/:userId", //body: empty
authenticateJWT_1.authenticateJWT, userController_1.default.getUserById);
router.put(
// Update user by ID
"/api/users/:userId", //body: username, email, password.
authenticateJWT_1.authenticateJWT, validatorMiddlewares_1.userValidationRules.updateUserById, userController_1.default.updateUserById);
router.delete(
// Delete user by ID
"/api/users/:userId", //body: empty
userController_1.default.deleteUserById);
/**Posts Routes*/
router.post(
// Create a new post
"/api/posts", //body: title, content, userId
authenticateJWT_1.authenticateJWT, validatorMiddlewares_1.postValidationRules.createPost, postController_1.default.createPost);
router.get(
// Get all posts with associated users, categories, and comments
"/api/posts", //body: empty
postController_1.default.getPosts);
router.get(
// Get post by ID with associated users, categories, and comments
"/api/posts/:postId", postController_1.default.getPostById //body: empty
);
router.put(
// Update post by ID
"/api/posts/:postId", //body: title, content
authenticateJWT_1.authenticateJWT, validatorMiddlewares_1.postValidationRules.updatePostById, postController_1.default.updatePostById);
router.delete(
// Delete post by ID
"/api/posts/:postId", //body: empty
postController_1.default.deletePostById);
/**Category Routes*/
router.post(
// Create a new category for a post
"/api/posts/:postId/categories", //body: categoryName
authenticateJWT_1.authenticateJWT, validatorMiddlewares_1.categoryValidationRules.createCategoryForPost, postController_1.default.createCategoryForPost);
router.get(
// Get categories for a specific post
"/api/posts/:postId/categories", //body: empty
postController_1.default.getCategoriesForPost);
/**Comments Routes*/
router.post(
// Create a new comment for a post
"/api/posts/:postId/comments", //body: content, userId
authenticateJWT_1.authenticateJWT, validatorMiddlewares_1.commentValidationRules.createCommentForPost, postController_1.default.createCommentForPost);
router.get(
// Get comments for a specific post
"/api/posts/:postId/comments", //body: empty
postController_1.default.getCommentsForPost);
exports.default = router;
