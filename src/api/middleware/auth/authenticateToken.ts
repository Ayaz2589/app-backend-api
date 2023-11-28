import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../../../types";

declare module "express-serve-static-core" {
  interface Request {
    user?: string | undefined | JwtPayload | User;
  }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err, user) => {
    if (err) {
      return res.status(403).send({ error: "Forbidden" });
    }
    if (user) {
      console.log()
    }
    req.user = user;
  });

  next();
};

export default authenticateToken;
