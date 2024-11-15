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
router.post("/api/auth/login", //body: email, password
validatorMiddlewares_1.userValidationRules.loginUser, userController_1.default.loginUser);
router.post("/api/auth/register", validatorMiddlewares_1.userValidationRules.registerUser, userController_1.default.registerUser);
/**User Routes*/
router.get("/api/users", //body: empty
authenticateJWT_1.authenticateJWT, //TODO: ONLY ADMIN OR MANEGER
userController_1.default.getUsers);
router.post("/api/users", //body: username, email, password.
// authenticateJWT, BIG NO! if we yet dont have user we cant authenticate them.
validatorMiddlewares_1.userValidationRules.createUser, userController_1.default.createUser //TODO: reqister? or "admin", how we gonna use this rout?
);
router.get("/api/users/:userId", //body: empty
authenticateJWT_1.authenticateJWT, userController_1.default.getUserById);
router.put("/api/users/:userId", //body: username, email, password.
authenticateJWT_1.authenticateJWT, validatorMiddlewares_1.userValidationRules.updateUserById, userController_1.default.updateUserById);
router.delete("/api/users/:userId", //body: empty
authenticateJWT_1.authenticateJWT, userController_1.default.deleteUserById);
/**Posts Routes*/
router.post("/api/posts", //body: title, content, userId
authenticateJWT_1.authenticateJWT, validatorMiddlewares_1.postValidationRules.createPost, postController_1.default.createPost);
router.get(
// Get all posts with associated users, categories, and comments
"/api/posts", //body: empty
postController_1.default.getPosts);
router.get(
// Get post by ID with associated users, categories, and comments
"/api/posts/:postId", postController_1.default.getPostById //body: empty
);
router.put("/api/posts/:postId", //body: title, content, userId
authenticateJWT_1.authenticateJWT, validatorMiddlewares_1.postValidationRules.updatePostById, postController_1.default.updatePostById);
router.delete("/api/posts/:postId", //body: userId
authenticateJWT_1.authenticateJWT, postController_1.default.deletePostById);
/**Category Routes*/
router.post("/api/posts/:postId/categories", //body: categoryName
authenticateJWT_1.authenticateJWT, //I chose to have any user can add category.
//(we can make only user that wrote the post but it not that matters)
validatorMiddlewares_1.categoryValidationRules.createCategoryForPost, postController_1.default.createCategoryForPost);
router.get("/api/posts/:postId/categories", //body: empty
postController_1.default.getCategoriesForPost);
/**Comments Routes*/
router.post("/api/posts/:postId/comments", //body: content, userId
authenticateJWT_1.authenticateJWT, validatorMiddlewares_1.commentValidationRules.createCommentForPost, postController_1.default.createCommentForPost);
router.get("/api/posts/:postId/comments", //body: empty
postController_1.default.getCommentsForPost);
exports.default = router;
