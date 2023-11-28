import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface RequestWithUser extends Request {
  user?: any;
}

const authenticateToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err, user) => {
    if (err) {
      return res.status(403).send({ error: "Forbidden" });
    }
    req.user = user;
  });

  next();
};

export default authenticateToken;
