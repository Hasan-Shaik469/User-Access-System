"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const software_1 = require("../controllers/software");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/", auth_1.authenticate, (0, auth_1.authorize)("Admin"), software_1.createSoftware);
router.get("/", auth_1.authenticate, software_1.getAllSoftware);
exports.default = router;
