import express from "express";
import { createSoftware, getAllSoftware } from "../controllers/software";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

router.post("/", authenticate, authorize("Admin"), createSoftware);
router.get("/", authenticate, getAllSoftware);

export default router;
