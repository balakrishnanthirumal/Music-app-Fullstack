import express from "express";
import {
  getAllSongs,
  getFeaturedSongs,
} from "../controllers/songController.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending ", getTrendingSongs);

export default router;
