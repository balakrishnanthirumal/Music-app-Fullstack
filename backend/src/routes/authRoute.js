import { authCallback } from "../controllers/authController.js";

import express from "express";

const router = express.Router();

router.post("/callback", authCallback);

export default router;
