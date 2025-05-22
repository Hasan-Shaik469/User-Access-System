"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_1 = require("../controllers/request");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/", auth_1.authenticate, (0, auth_1.authorize)("Employee"), request_1.submitRequest);
router.get("/", auth_1.authenticate, (0, auth_1.authorize)("Manager"), request_1.getRequests);
router.patch("/:id", auth_1.authenticate, (0, auth_1.authorize)("Manager"), request_1.updateRequestStatus);
exports.default = router;
