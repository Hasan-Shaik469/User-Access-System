import express from "express";
import { submitRequest, getRequests, updateRequestStatus } from "../controllers/request";
import { authenticate, authorize } from "../middleware/auth";
const router = express.Router();

router.post("/", authenticate, authorize("Employee"), submitRequest);
router.get("/", authenticate, authorize("Manager"), getRequests);
router.patch("/:id", authenticate, authorize("Manager"), updateRequestStatus);

export default router;