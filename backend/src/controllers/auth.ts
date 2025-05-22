import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";

const userRepo = AppDataSource.getRepository(User);

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepo.create({ username, password: hashedPassword, role: "Employee" });
    await userRepo.save(user);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Signup failed" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await userRepo.findOneBy({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
};
