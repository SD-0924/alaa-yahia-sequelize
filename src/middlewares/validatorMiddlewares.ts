import { check, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Middleware to handle validation errors
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules
export const userValidationRules = {
  createUser: [
    check("username").isString().withMessage("Username must be a string."),
    check("email")
      .isEmail()
      .withMessage("Email must be a valid email address."),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    validateRequest,
  ],
  updateUserById: [
    param("userId").isInt().withMessage("User ID must be an integer."),
    check("username")
      .optional()
      .isString()
      .withMessage("Username must be a string."),
    check("email")
      .optional()
      .isEmail()
      .withMessage("Email must be a valid email address."),
    check("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    validateRequest,
  ],
};

export const postValidationRules = {
  createPost: [
    check("title").isString().withMessage("Title must be a string."),
    check("content").isString().withMessage("Content must be a string."),
    check("userId").isInt().withMessage("User ID must be an integer."),
    validateRequest,
  ],
  updatePostById: [
    param("postId").isInt().withMessage("Post ID must be an integer."),
    check("title").optional().isString().withMessage("Title must be a string."),
    check("content")
      .optional()
      .isString()
      .withMessage("Content must be a string."),
    validateRequest,
  ],
};

export const categoryValidationRules = {
  createCategoryForPost: [
    param("postId").isInt().withMessage("Post ID must be an integer."),
    check("categoryName")
      .isString()
      .withMessage("Category name must be a string."),
    validateRequest,
  ],
};

export const commentValidationRules = {
  createCommentForPost: [
    param("postId").isInt().withMessage("Post ID must be an integer."),
    check("content").isString().withMessage("Content must be a string."),
    check("userId").isInt().withMessage("User ID must be an integer."),
    validateRequest,
  ],
};
