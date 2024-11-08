import { Request, Response } from "express";
import User from "../models/userModel";

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: error.message });
  }
};

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.create({ username, email, password });
    return res.status(201).json(user);
  } catch (error: any) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get a user by ID
const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
const updateUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    await user.save();
    return res.status(200).json(user);
  } catch (error: any) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Delete a user by ID
const deleteUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
