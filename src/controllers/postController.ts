import { Request, Response } from "express";
import Post from "../models/postModel";
import Category from "../models/categoryModel";
import Comment from "../models/commentModel";
import User from "../models/userModel";
import PostCategory from "../models/postCategoryModelJunction";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, userId } = req.body;
    const newPost = await Post.create({ title, content, userId });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error });
  }
};

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

export const createCategoryForPost = async (req: Request, res: Response) => {
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
