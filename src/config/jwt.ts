import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, process.env.SECRET_KEY!);
};

export const verifyToken = (token: string): object | null => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!);
    if (typeof decoded === "string") {
      return null;
    }
    return decoded;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Invalid token:", error.message);
    } else {
      console.error("Invalid token:", error);
    }
    return null;
  }
};
