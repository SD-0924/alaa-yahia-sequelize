const express = require("express");
const router = express.Router();
import users from "../controllers/userController";
import posts from "../controllers/postController";
import {
  categoryValidationRules,
  commentValidationRules,
  postValidationRules,
  userValidationRules,
} from "../middlewares/validatorMiddlewares";
/**User Routes*/
router.get(
  // Get all users
  "/api/users", //body: empty
  users.getUsers
);

router.post(
  // Create a new user
  "/api/users", //body: username, email, password.
  userValidationRules.createUser,
  users.createUser
);

router.get(
  // Get user by ID
  "/api/users/:userId", //body: empty
  users.getUserById
);

router.put(
  // Update user by ID
  "/api/users/:userId", //body: username, email, password.
  userValidationRules.updateUserById,
  users.updateUserById
);

router.delete(
  // Delete user by ID
  "/api/users/:userId", //body: empty
  users.deleteUserById
);

/**Posts Routes*/
router.post(
  // Create a new post
  "/api/posts", //body: title, content, userId
  postValidationRules.createPost,
  posts.createPost
);

router.get(
  // Get all posts with associated users, categories, and comments
  "/api/posts", //body: empty
  posts.getPosts
);

router.get(
  // Get post by ID with associated users, categories, and comments
  "/api/posts/:postId",
  posts.getPostById //body: empty
);

router.put(
  // Update post by ID
  "/api/posts/:postId", //body: title, content
  postValidationRules.updatePostById,
  posts.updatePostById
);

router.delete(
  // Delete post by ID
  "/api/posts/:postId", //body: empty
  posts.deletePostById
);

/**Category Routes*/
router.post(
  // Create a new category for a post
  "/api/posts/:postId/categories", //body: categoryName
  categoryValidationRules.createCategoryForPost,
  posts.createCategoryForPost
);

router.get(
  // Get categories for a specific post
  "/api/posts/:postId/categories", //body: empty
  posts.getCategoriesForPost
);

/**Comments Routes*/
router.post(
  // Create a new comment for a post
  "/api/posts/:postId/comments", //body: content, userId
  commentValidationRules.createCommentForPost,
  posts.createCommentForPost
);

router.get(
  // Get comments for a specific post
  "/api/posts/:postId/comments", //body: empty
  posts.getCommentsForPost
);

export default router;
