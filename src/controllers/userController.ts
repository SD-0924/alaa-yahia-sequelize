import { Request, Response } from "express";
import User from "../models/userModel";

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    console.log(username, email, password);
    const user = await User.create({ username, email, password });
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUsers,
  createUser,
};
