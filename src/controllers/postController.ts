// src/controllers/PostController.ts

import { Request, Response } from "express";
import Post from "../models/postModel";
import Category from "../models/categoryModel";
import Comment from "../models/commentModel";
import User from "../models/userModel";
import PostCategory from "../models/postCategoryModelJunction";

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, userId } = req.body;
    const newPost = await Post.create({ title, content, userId });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error });
  }
};

// Get all posts with associated users, categories, and comments
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "username", "email"] },
        { model: Category, as: "categories", through: { attributes: [] } },
        {
          model: Comment,
          as: "comments",
          include: [
            { model: User, as: "user", attributes: ["id", "username"] },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve posts", error });
  }
};

// Get post by ID with associated users, categories, and comments
export const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId, {
      include: [
        { model: User, as: "user", attributes: ["id", "username", "email"] },
        { model: Category, as: "categories", through: { attributes: [] } },
        {
          model: Comment,
          as: "comments",
          include: [
            { model: User, as: "user", attributes: ["id", "username"] },
          ],
        },
      ],
    });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve post", error });
  }
};

// Update post by ID
export const updatePostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    const post = await Post.findByPk(postId);
    if (post) {
      post.title = title;
      post.content = content;
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update post", error });
  }
};

// Delete post by ID
export const deletePostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const deleted = await Post.destroy({ where: { id: postId } });
    if (deleted) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error });
  }
};

// Create a new category for a post
export const createCategoryForPost = async (req: Request, res: Response) => {
  try {
    const { postId, categoryId } = req.body;
    const post = await Post.findByPk(postId);
    const category = await Category.findByPk(categoryId);

    if (post && category) {
      await PostCategory.create({ postId, categoryId });
      res.status(201).json({ message: "Category added to post successfully" });
    } else {
      res.status(404).json({ message: "Post or Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to add category to post", error });
  }
};

// Get categories for a specific post
export const getCategoriesForPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId, {
      include: [
        { model: Category, as: "categories", through: { attributes: [] } },
      ],
    });

    if (post) {
      res.status(200).json(post.categories);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve categories for post", error });
  }
};

// Create a new comment for a post
export const createCommentForPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { content, userId } = req.body;
    const post = await Post.findByPk(postId);
    const user = await User.findByPk(userId);

    if (post && user) {
      const comment = await Comment.create({
        content,
        postId: post.id,
        userId: user.id,
      });
      res.status(201).json(comment);
    } else {
      res.status(404).json({ message: "Post or User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create comment for post", error });
  }
};

// Get comments for a specific post
export const getCommentsForPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId, {
      include: [
        {
          model: Comment,
          as: "comments",
          include: [
            { model: User, as: "user", attributes: ["id", "username"] },
          ],
        },
      ],
    });

    if (post) {
      res.status(200).json(post.comments);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve comments for post", error });
  }
};
