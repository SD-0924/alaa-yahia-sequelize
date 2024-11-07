import { Request, Response } from "express";
import User from "../models/userModel";

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log("here");

    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUsers,
};
