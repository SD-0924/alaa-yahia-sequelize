import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../Utils/jwtUtils";
import User from "../models/userModel";

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authentication token missing or invalid." });
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token); // Assuming verifyToken decodes and verifies the token

  if (!payload) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }

  const user = await User.findByPk(payload.userId);
  if (
    !user ||
    !user.tokenIssuedAt ||
    new Date(payload.tokenIssuedAt) < user.tokenIssuedAt
  ) {
    return res.status(403).json({ message: "Token is invalid or expired." });
  }

  // Attach the payload to the request object
  req.user = payload;

  // Check if the route has a :userId parameter
  const userIdParam = req.params.userId || req.body.userId;
  if (userIdParam && String(userIdParam) !== String(payload.userId)) {
    return res
      .status(403)
      .json({ message: "You are not authorized to access this resource." });
  }

  next();
};
