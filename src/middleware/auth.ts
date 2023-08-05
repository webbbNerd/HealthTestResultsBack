import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.token) {
    return res.status(400).json({
      error: "Please login first",
    });
  }

  const decoded = jwt.decode((req.headers.token).toString()) as { _id: string } | null;

  if (!decoded) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }

  // Use the decoded data
  const userId = decoded._id;
  req.headers.userId = userId;

  next();
};
