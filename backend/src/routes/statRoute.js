import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Stat route with GET method");
});
export default router;
