import express from "express";
import {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin,
} from "../controllers/adminController.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/check", protectRoute, requireAdmin, checkAdmin);

router.post("/songs", protectRoute, requireAdmin, createSong);
router.delete("/songs/:id", protectRoute, requireAdmin, deleteSong);
router.post("/albums", protectRoute, requireAdmin, createAlbum);
router.delete("/albums/:id", protectRoute, requireAdmin, deleteAlbum);

export default router;
