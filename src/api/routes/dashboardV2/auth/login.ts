import express from "express";
import bcrypt from "bcrypt";
import { User, RefreshTokenModel } from "../../../../db/models";
import { generateToken, refreshToken as getRefreshToken } from "./utils";

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

  //@ts-expect-error cannot figure out mongoose type error
  const accessToken = generateToken(user);

  //@ts-expect-error cannot figure out mongoose type error
  const refreshToken = getRefreshToken(user);
  const refreshTokenToSave = new RefreshTokenModel({
    refreshToken,
  });
  await refreshTokenToSave.save();

  res.status(200).send({ accessToken, refreshToken });
});

export default router;
