"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
const data_source_1 = require("../data-source");
const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
const signup = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    if (!["Employee", "Manager", "Admin"].includes(role)) {
      res.status(400).json({ message: "Invalid role" });
      return;
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = userRepo.create({ username, password: hashedPassword, role });
    await userRepo.save(user);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Signup failed" });
  }
};
exports.signup = signup;
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userRepo.findOneBy({ username });
        if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.json({ token, role: user.role });
    }
    catch (err) {
        res.status(500).json({ message: "Login error" });
    }
};
exports.login = login;
