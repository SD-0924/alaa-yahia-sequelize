const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const files_middleware = require("../middlewares/middlewares");

// User Routes
router.get(
  // Get all users
  "/api/users",
  controller.getUsers
);

router.post(
  // Create a new user
  "/api/users",
  controller.createUser
);

router.get(
  // Get user by ID
  "/api/users/:userId",
  controller.getUserById
);

router.put(
  // Update user by ID
  "/api/users/:userId",
  controller.updateUserById
);

router.delete(
  // Delete user by ID
  "/api/users/:userId",
  controller.deleteUserById
);

// Posts Routes
router.post(
  // Create a new post
  "/api/posts",
  controller.createPost
);

router.get(
  // Get all posts with associated users, categories, and comments
  "/api/posts",
  controller.getPosts
);

router.get(
  // Get post by ID with associated users, categories, and comments
  "/api/posts/:postId",
  controller.getPostById
);

router.put(
  // Update post by ID
  "/api/posts/:postId",
  controller.updatePostById
);

router.delete(
  // Delete post by ID
  "/api/posts/:postId",
  controller.deletePostById
);

router.post(
  // Create a new category for a post
  "/api/posts/:postId/categories",
  controller.createCategoryForPost
);

router.get(
  // Get categories for a specific post
  "/api/posts/:postId/categories",
  controller.getCategoriesForPost
);

router.post(
  // Create a new comment for a post
  "/api/posts/:postId/comments",
  controller.createCommentForPost
);

router.get(
  // Get comments for a specific post
  "/api/posts/:postId/comments",
  controller.getCommentsForPost
);

module.exports = router;
