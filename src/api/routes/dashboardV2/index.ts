import express from "express";
import users from "./users";
import login from "./auth/login";

const router = express.Router();

router.get("/status", (req, res) => {
  res
    .status(200)
    .send({ isActive: true, message: "Dashboard V2 API is running" });
});

router.use("/auth", login);

router.use("/users", users);

export default router;
