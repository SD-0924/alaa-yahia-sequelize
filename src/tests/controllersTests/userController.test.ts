import { Request, Response } from "express";
import User from "../../models/userModel";
import userController from "../../controllers/userController";

// Mock the User model
jest.mock("../../models/userModel");

describe("User Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {};
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for getUsers
  it("should fetch all users", async () => {
    const users = [
      { id: 1, username: "user1" },
      { id: 2, username: "user2" },
    ];
    (User.findAll as jest.Mock).mockResolvedValue(users);

    await userController.getUsers(req as Request, res as Response);

    expect(User.findAll).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(users);
  });

  // Test for createUser
  it("should create a new user", async () => {
    const newUser = { id: 1, username: "newUser", email: "new@example.com" };
    req.body = {
      username: "newUser",
      email: "new@example.com",
      password: "pass123",
    };
    (User.create as jest.Mock).mockResolvedValue(newUser);

    await userController.createUser(req as Request, res as Response);

    expect(User.create).toHaveBeenCalledWith(req.body);
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(newUser);
  });

  // Test for getUserById
  it("should fetch a user by ID", async () => {
    const user = { id: 1, username: "user1" };
    req.params = { userId: "1" };
    (User.findByPk as jest.Mock).mockResolvedValue(user);

    await userController.getUserById(req as Request, res as Response);

    expect(User.findByPk).toHaveBeenCalledWith("1");
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(user);
  });

  it("should return 404 if user not found", async () => {
    req.params = { userId: "1" };
    (User.findByPk as jest.Mock).mockResolvedValue(null);

    await userController.getUserById(req as Request, res as Response);

    expect(User.findByPk).toHaveBeenCalledWith("1");
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: "User not found" });
  });

  // Test for updateUserById
  it("should update a user by ID", async () => {
    const user = {
      id: 1,
      username: "user1",
      email: "user1@example.com",
      save: jest.fn().mockResolvedValue(true),
    };
    req.params = { userId: "1" };
    req.body = { username: "updatedUser" };
    (User.findByPk as jest.Mock).mockResolvedValue(user);

    await userController.updateUserById(req as Request, res as Response);

    expect(User.findByPk).toHaveBeenCalledWith("1");
    expect(user.save).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(user);
  });

  it("should return 404 if user to update is not found", async () => {
    req.params = { userId: "1" };
    (User.findByPk as jest.Mock).mockResolvedValue(null);

    await userController.updateUserById(req as Request, res as Response);

    expect(User.findByPk).toHaveBeenCalledWith("1");
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: "User not found" });
  });

  // Test for deleteUserById
  it("should delete a user by ID", async () => {
    const user = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };
    req.params = { userId: "1" };
    (User.findByPk as jest.Mock).mockResolvedValue(user);

    await userController.deleteUserById(req as Request, res as Response);

    expect(User.findByPk).toHaveBeenCalledWith("1");
    expect(user.destroy).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "User deleted successfully",
    });
  });

  it("should return 404 if user to delete is not found", async () => {
    req.params = { userId: "1" };
    (User.findByPk as jest.Mock).mockResolvedValue(null);

    await userController.deleteUserById(req as Request, res as Response);

    expect(User.findByPk).toHaveBeenCalledWith("1");
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: "User not found" });
  });
});
