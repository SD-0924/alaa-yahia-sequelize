import { Request, Response } from "express";
import Post from "../models/postModel";
import Category from "../models/categoryModel";
import Comment from "../models/commentModel";
import User from "../models/userModel";
import PostCategory from "../models/postCategoryModelJunction";

const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, userId } = req.body;
    const newPost = await Post.create({ title, content, userId });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error });
  }
};

const getPosts = async (req: Request, res: Response) => {
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

const getPostById = async (req: Request, res: Response) => {
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

const updatePostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { title, content, userId } = req.body;
    const post = await Post.findByPk(postId);
    if (post && post.userId === userId) {
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

const deletePostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const deleted = await Post.destroy({ where: { id: postId, userId } });
    if (deleted) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error });
  }
};

const createCategoryForPost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId);
    const { categoryName } = req.body;

    const post = await Post.findByPk(postId);
    const [category] = await Category.findOrCreate({
      where: { name: categoryName },
    });

    if (post && category) {
      await PostCategory.create({ postId, categoryId: category.dataValues.id });
      res.status(201).json({ message: "Category added to post successfully" });
    } else {
      res.status(404).json({ message: "Post or Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to add category to post", error });
  }
};

const getCategoriesForPost = async (req: Request, res: Response) => {
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

const createCommentForPost = async (req: Request, res: Response) => {
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

const getCommentsForPost = async (req: Request, res: Response) => {
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

export default {
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
