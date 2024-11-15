import { Request, Response } from "express";
import postController from "../../controllers/postController";
import User from "../../models/userModel";
import Post from "../../models/postModel";
import Category from "../../models/categoryModel";
import Comment from "../../models/commentModel";
import PostCategory from "../../models/postCategoryModelJunction";
import { body } from "express-validator";

jest.mock("../../models/userModel");
jest.mock("../../models/postModel");
jest.mock("../../models/categoryModel");
jest.mock("../../models/commentModel");
jest.mock("../../models/postCategoryModelJunction");

describe("Post Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonSpy: jest.SpyInstance;
  let statusSpy: jest.SpyInstance;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jsonSpy = jest.spyOn(res, "json");
    statusSpy = jest.spyOn(res, "status");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createPost", () => {
    it("should create a new post", async () => {
      req.body = { title: "New Post", content: "Post content", userId: 1 };
      (Post.create as jest.Mock).mockResolvedValue(req.body);

      await postController.createPost(req as Request, res as Response);

      expect(Post.create).toHaveBeenCalledWith(req.body);
      expect(statusSpy).toHaveBeenCalledWith(201);
      expect(jsonSpy).toHaveBeenCalledWith(req.body);
    });
  });

  describe("getPosts", () => {
    it("should retrieve all posts", async () => {
      const posts = [{ id: 1, title: "Post 1" }];
      (Post.findAll as jest.Mock).mockResolvedValue(posts);

      await postController.getPosts(req as Request, res as Response);

      expect(Post.findAll).toHaveBeenCalled();
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith(posts);
    });
  });

  describe("getPostById", () => {
    it("should retrieve a post by ID", async () => {
      const post = { id: 1, title: "Post 1" };
      req.params = { postId: "1" };
      (Post.findByPk as jest.Mock).mockResolvedValue(post);

      await postController.getPostById(req as Request, res as Response);

      expect(Post.findByPk).toHaveBeenCalledWith("1", expect.any(Object));
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith(post);
    });

    it("should return 404 if post is not found", async () => {
      req.params = { postId: "1" };
      (Post.findByPk as jest.Mock).mockResolvedValue(null);

      await postController.getPostById(req as Request, res as Response);

      expect(statusSpy).toHaveBeenCalledWith(404);
      expect(jsonSpy).toHaveBeenCalledWith({ message: "Post not found" });
    });
  });

  describe("getCategoriesForPost", () => {
    it("should retrieve categories for a post", async () => {
      const post = { categories: [{ id: 1, name: "Category 1" }] };
      req.params = { postId: "1" };
      (Post.findByPk as jest.Mock).mockResolvedValue(post);

      await postController.getCategoriesForPost(
        req as Request,
        res as Response
      );

      expect(Post.findByPk).toHaveBeenCalledWith("1", expect.any(Object));
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith(post.categories);
    });
  });

  describe("getCommentsForPost", () => {
    it("should retrieve comments for a post", async () => {
      const post = { comments: [{ id: 1, content: "Comment 1" }] };
      req.params = { postId: "1" };
      (Post.findByPk as jest.Mock).mockResolvedValue(post);

      await postController.getCommentsForPost(req as Request, res as Response);

      expect(Post.findByPk).toHaveBeenCalledWith("1", expect.any(Object));
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith(post.comments);
    });
  });

  describe("createCategoryForPost", () => {
    it("should add a category to a post", async () => {
      req.params = { postId: "1" };
      req.body = { categoryName: "New Category" };
      (Post.findByPk as jest.Mock).mockResolvedValue({});
      (Category.findOrCreate as jest.Mock).mockResolvedValue([
        { dataValues: { id: 2 } },
      ]);
      (PostCategory.create as jest.Mock).mockResolvedValue({});

      await postController.createCategoryForPost(
        req as Request,
        res as Response
      );

      expect(Post.findByPk).toHaveBeenCalledWith(1);
      expect(Category.findOrCreate).toHaveBeenCalledWith({
        where: { name: "New Category" },
      });
      expect(PostCategory.create).toHaveBeenCalledWith({
        postId: 1,
        categoryId: 2,
      });
      expect(statusSpy).toHaveBeenCalledWith(201);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: "Category added to post successfully",
      });
    });
  });

  describe("createCommentForPost", () => {
    it("should create a comment for a post", async () => {
      req.params = { postId: "1" };
      req.body = { content: "New Comment", userId: 1 };

      (User.findByPk as jest.Mock).mockResolvedValue({});
      (Post.findByPk as jest.Mock).mockResolvedValue({});
      (Comment.create as jest.Mock).mockResolvedValue({});

      await postController.createCommentForPost(
        req as Request,
        res as Response
      );

      expect(Comment.create).toHaveBeenCalledWith({
        content: "New Comment",
      });

      expect(statusSpy).toHaveBeenCalledWith(201);
    });
  });

  describe("deletePostById", () => {
    it("should delete a post by ID", async () => {
      req.params = { postId: "1" };
      req.body = { userId: "1" };
      (Post.destroy as jest.Mock).mockResolvedValue(1);

      await postController.deletePostById(req as Request, res as Response);

      expect(Post.destroy).toHaveBeenCalledWith({
        where: { id: "1", userId: "1" },
      }); //
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: "Post deleted successfully",
      });
    });

    it("should return 404 if post not found", async () => {
      req.params = { postId: "1" };
      req.body = { userId: "1" };
      (Post.destroy as jest.Mock).mockResolvedValue(0);

      await postController.deletePostById(req as Request, res as Response);

      expect(statusSpy).toHaveBeenCalledWith(404);
      expect(jsonSpy).toHaveBeenCalledWith({ message: "Post not found" });
    });
  });

  describe("updatePostById", () => {
    it("should update a post by ID", async () => {
      req.params = { postId: "1" };
      req.body = { title: "Updated Title", content: "Updated Content" };
      const post = { save: jest.fn(), title: "", content: "" };
      (Post.findByPk as jest.Mock).mockResolvedValue(post);

      await postController.updatePostById(req as Request, res as Response);

      expect(Post.findByPk).toHaveBeenCalledWith("1");
      expect(post.title).toBe("Updated Title");
      expect(post.content).toBe("Updated Content");
      expect(post.save).toHaveBeenCalled();
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith(post);
    });
  });
});
