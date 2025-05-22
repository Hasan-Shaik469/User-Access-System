// src/types/express/index.d.ts
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload | { id: number; role: string };
    }
  }
}

export {}; // Required to make this a module
