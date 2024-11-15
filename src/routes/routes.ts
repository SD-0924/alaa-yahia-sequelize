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
import { authenticateJWT } from "../middlewares/authenticateJWT";

/**Auth Routes*/
router.post(
  "/api/auth/login", //body: email, password
  userValidationRules.loginUser,
  users.loginUser
);

router.post(
  "/api/auth/register",
  userValidationRules.registerUser,
  users.registerUser
);

/**User Routes*/
router.get(
  "/api/users", //body: empty
  authenticateJWT, //TODO: ONLY ADMIN OR MANEGER
  users.getUsers
);

router.post(
  "/api/users", //body: username, email, password.
  // authenticateJWT, BIG NO! if we yet dont have user we cant authenticate them.
  userValidationRules.createUser,
  users.createUser //TODO: reqister? or "admin", how we gonna use this rout?
);

router.get(
  "/api/users/:userId", //body: empty
  authenticateJWT,
  users.getUserById
);

router.put(
  "/api/users/:userId", //body: username, email, password.
  authenticateJWT,
  userValidationRules.updateUserById,
  users.updateUserById
);

router.delete(
  "/api/users/:userId", //body: empty
  authenticateJWT,
  users.deleteUserById
);

/**Posts Routes*/
router.post(
  "/api/posts", //body: title, content, userId
  authenticateJWT,
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
  "/api/posts/:postId", //body: title, content, userId
  authenticateJWT,
  postValidationRules.updatePostById,
  posts.updatePostById
);

router.delete(
  "/api/posts/:postId", //body: userId
  authenticateJWT,
  posts.deletePostById
);

/**Category Routes*/
router.post(
  "/api/posts/:postId/categories", //body: categoryName
  authenticateJWT, //I chose to have any user can add category.
  //(we can make only user that wrote the post but it not that matters)
  categoryValidationRules.createCategoryForPost,
  posts.createCategoryForPost
);

router.get(
  "/api/posts/:postId/categories", //body: empty
  posts.getCategoriesForPost
);

/**Comments Routes*/
router.post(
  "/api/posts/:postId/comments", //body: content, userId
  authenticateJWT,
  commentValidationRules.createCommentForPost,
  posts.createCommentForPost
);

router.get(
  "/api/posts/:postId/comments", //body: empty
  posts.getCommentsForPost
);

export default router;
