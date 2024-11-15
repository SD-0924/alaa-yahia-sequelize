import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// Generate JWT
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify JWT
export const verifyToken = (
  token: string
): { userId: string; tokenIssuedAt: Date } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    return {
      userId: decoded.userId as string,
      tokenIssuedAt: decoded.tokenIssuedAt as Date,
    };
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
