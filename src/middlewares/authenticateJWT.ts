import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../Utils/jwtUtils";

export const authenticateJWT = (
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
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }

  req.user = payload; // Attach the payload to the request object
  next();
};
