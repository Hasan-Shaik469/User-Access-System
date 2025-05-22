import { Request, Response } from "express";
import { Software } from "../entities/Software";
import { AppDataSource } from "../data-source";

const softwareRepo = AppDataSource.getRepository(Software);

export const createSoftware = async (req: Request, res: Response) => {
  const { name, description, accessLevels } = req.body;
  try {
    const software = softwareRepo.create({ name, description, accessLevels });
    await softwareRepo.save(software);
    res.status(201).json(software);
  } catch (err) {
    res.status(400).json({ message: "Creation failed" });
  }
};

export const getAllSoftware = async (_req: Request, res: Response) => {
  try {
    const software = await softwareRepo.find();
    res.json(software);
  } catch (err) {
    res.status(500).json({ message: "Fetch error" });
  }
};
