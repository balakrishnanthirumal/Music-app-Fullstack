import express from "express";
import { getStats } from "../controllers/statController.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, requireAdmin, getStats);

export default router;
