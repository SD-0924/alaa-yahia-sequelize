"use strict";
const express = require("express");
const router = express.Router();
const users = require("../controllers/userController");
const posts = require("../controllers/postController");
const middleware = require("../middlewares/middlewares");
//User Routes
router.get(
// Get all users
"/api/users", users.getUsers);
router.post(
// Create a new user
"/api/users", users.createUser);
router.get(
// Get user by ID
"/api/users/:userId", users.getUserById);
router.put(
// Update user by ID
"/api/users/:userId", users.updateUserById);
router.delete(
// Delete user by ID
"/api/users/:userId", users.deleteUserById);
// Posts Routes
router.post(
// Create a new post
"/api/posts", posts.createPost);
router.get(
// Get all posts with associated users, categories, and comments
"/api/posts", posts.getPosts);
router.get(
// Get post by ID with associated users, categories, and comments
"/api/posts/:postId", posts.getPostById);
router.put(
// Update post by ID
"/api/posts/:postId", posts.updatePostById);
router.delete(
// Delete post by ID
"/api/posts/:postId", posts.deletePostById);
router.post(
// Create a new category for a post
"/api/posts/:postId/categories", posts.createCategoryForPost);
router.get(
// Get categories for a specific post
"/api/posts/:postId/categories", posts.getCategoriesForPost);
router.post(
// Create a new comment for a post
"/api/posts/:postId/comments", posts.createCommentForPost);
router.get(
// Get comments for a specific post
"/api/posts/:postId/comments", posts.getCommentsForPost);
module.exports = router;
