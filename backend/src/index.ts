/// <reference types="./types/express" />

import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import softwareRoutes from "./routes/software";
import requestRoutes from "./routes/request";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/software", softwareRoutes);
app.use("/api/requests", requestRoutes);

AppDataSource.initialize().then(() => {
  app.listen(5000, () => {
    console.log("Server started on http://localhost:5000");
  });
}).catch(err => console.error(err));
