import { Request as Req, Response } from "express";
import { AppDataSource } from "../data-source";
import { Request } from "../entities/Request";
import { User } from "../entities/User";
import { Software } from "../entities/Software";

const requestRepo = AppDataSource.getRepository(Request);
const userRepo = AppDataSource.getRepository(User);
const softwareRepo = AppDataSource.getRepository(Software);

export const submitRequest = async (req: Req, res: Response): Promise<void> => {
  const { softwareId, accessType, reason } = req.body;
  const user = await userRepo.findOneBy({ id: (req as any).user.id });
  const software = await softwareRepo.findOneBy({ id: softwareId });

  if (!user || !software) {
    res.status(400).json({ message: "Invalid user or software" });
    return;
  }

  const request = requestRepo.create({ user, software, accessType, reason, status: "Pending" });
  await requestRepo.save(request);
  res.status(201).json({ message: "Request submitted" });
};

export const getRequests = async (_req: Req, res: Response): Promise<void> => {
  const requests = await requestRepo.find({ relations: ["user", "software"] });
  res.json(requests);
};

export const updateRequestStatus = async (req: Req, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  const request = await requestRepo.findOneBy({ id: parseInt(id) });
  if (!request) {
    res.status(404).json({ message: "Request not found" });
    return;
  }

  request.status = status;
  await requestRepo.save(request);
  res.json({ message: `Request ${status.toLowerCase()}` });
};
