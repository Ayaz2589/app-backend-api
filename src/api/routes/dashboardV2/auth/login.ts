import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../../db/models";

const router = express.Router();

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({ error: "User doesn't exists" });
  }
  const password: string = user.password || "";

  const match = await bcrypt.compare(req.body.password, password);

  if (!match) {
    return res.status(400).send({ error: "Incorrect password" });
  }

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET || "");

  res.status(200).send({ accessToken });
});

export default router;
