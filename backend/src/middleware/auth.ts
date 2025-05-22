import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Missing token" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};

export const authorize = (role: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || typeof req.user !== "object" || req.user.role !== role) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  };
};
