import express from "express";
const router = express.Router();

router.get("/status", (req, res) => {
  res.status(200).send("Dashboard API is running");
});

export default router;