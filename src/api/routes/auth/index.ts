import express from "express";
import bcrypt from "bcrypt";
import { User, RefreshTokenModel } from "../../../db/models";
import { generateToken, refreshToken as getRefreshToken } from "./utils";
import { authenticateToken } from "../../middleware";
import { AuthErrorHandler } from "../../error";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user != null) throw AuthErrorHandler.unauthorizedUserAlreadyExists();

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    if (!newUser) throw AuthErrorHandler.serverError();

    //@ts-expect-error cannot figure out mongoose type error
    const accessToken = generateToken(newUser);

    //@ts-expect-error cannot figure out mongoose type error
    const refreshToken = getRefreshToken(newUser);
    const refreshTokenToSave = new RefreshTokenModel({
      refreshToken,
    });

    await newUser.save();
    await refreshTokenToSave.save();

    res.status(201).send({ accessToken, refreshToken });
  } catch (error) {
    next(error)
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw AuthErrorHandler.unauthorizedUser();
    }
    const password: string = user.password || "";
  
    const match = await bcrypt.compare(req.body.password, password);
  
    if (!match) {
      throw AuthErrorHandler.unauthorizedPassword();
    }
  
    //@ts-expect-error cannot figure out mongoose type error
    const accessToken = generateToken(user);
  
    //@ts-expect-error cannot figure out mongoose type error
    const refreshToken = getRefreshToken(user);
  
    const refreshTokenToSave = new RefreshTokenModel({
      refreshToken,
    });
    await refreshTokenToSave.save();
  
    res.status(200).send({ accessToken, refreshToken, isLoggedin: true });
  } catch (error: any) {
    next(error);
  }
});

router.delete("/logout", authenticateToken, async (req, res) => {
  const token = req.body.refreshToken;

  const refreshToken = await RefreshTokenModel.findOne({
    refreshToken: token,
  });

  if (!refreshToken) {
    return res.status(401).send({ error: "Refresh token not found" });
  }

  await RefreshTokenModel.deleteOne({ refreshToken: token });

  res.status(200).send({ isLoggedin: false });
});

router.post("/token", authenticateToken, async (req, res) => {
  const token = req.body.token;

  const refreshToken = await RefreshTokenModel.findOne({
    refreshToken: token,
  });

  if (!refreshToken) {
    return res.status(401).send({ error: "Refresh token not found" });
  }

  const { refreshToken: tokenToVerify } = refreshToken;

  jwt.verify(
    tokenToVerify as string,
    process.env.REFRESH_TOKEN_SECRET || "",
    (err, token) => {
      if (err) {
        return res.status(403).send({ error: "Forbidden" });
      }
      if (token) {
        //@ts-expect-error cannot figure out mongoose type error
        const accessToken = generateToken(token.user);
        res.status(200).send({ accessToken });
      }
    }
  );
});

router.get("/check-db-for-refresh-token", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  const refreshToken = await RefreshTokenModel.findOne({
    refreshToken: token,
  });

  if (!refreshToken) {
    return res
      .status(401)
      .send({ found: false, error: "Refresh token not found" });
  }

  res.status(200).send({
    found: true,
    refreshToken: refreshToken.refreshToken,
  });
});

export default router;
