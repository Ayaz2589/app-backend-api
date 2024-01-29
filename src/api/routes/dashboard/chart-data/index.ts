import express from "express";
import { authenticateToken } from "../../../middleware";
import generateUserDashboardData from "../utils";

const router = express.Router();

router.get("/dashboard", authenticateToken, async (req, res) => {
  if (!req.user) return res.status(403).send({ error: "Forbidden" });
  
  const userDashboardData = generateUserDashboardData();
  res.status(200).send(userDashboardData);
});

export default router;
