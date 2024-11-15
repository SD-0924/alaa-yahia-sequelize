import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../Utils/jwtUtils";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      tokenIssuedAt: new Date(),
    });

    const token = generateToken({
      userId: newUser.id,
      email: newUser.email,
      tokenIssuedAt: newUser.tokenIssuedAt,
    });

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "An error occurred during registration." });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credintials" });
  }

  user.tokenIssuedAt = new Date();
  await user.save();

  const token = generateToken({
    userId: user.id,
    email: user.email,
    tokenIssuedAt: user.tokenIssuedAt,
  });

  res.status(200).json({ message: "Login successful.", token });
};

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
    const user = await User.create({
      username,
      email,
      password,
      tokenIssuedAt: new Date(),
    });
    return res.status(201).json(user);
  } catch (error: any) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: error.message });
  }
};

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

const updateUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let username, email, password;
    if (req.body) {
      username = req.body.username;
      email = req.body.email;
      password = req.body.password;
    }
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

export default {
  loginUser,
  registerUser,
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
