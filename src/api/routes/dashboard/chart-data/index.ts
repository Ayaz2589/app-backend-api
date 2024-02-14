import express from "express";
import { authenticateToken } from "../../../middleware";
import generateUserDashboardData from "../utils";

const router = express.Router();

router.get("/dashboard", authenticateToken, async (req, res, next) => {
  try {
    if (req.user) {
      const userDashboardData = generateUserDashboardData();
      res.status(200).send(userDashboardData);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
