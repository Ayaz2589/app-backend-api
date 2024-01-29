import express from "express";
import users from "./users";
import chartData from "./chart-data";

const router = express.Router();

router.get("/status", (req, res) => {
  res
    .status(200)
    .send({ isActive: true, message: "Dashboard V2 API is running" });
});

router.use("/users", users);
router.use("/chart-data", chartData);

export default router;
