import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../../../types";
import { AuthErrorHandler } from "../../error";

declare module "express-serve-static-core" {
  interface Request {
    user?: string | undefined | JwtPayload | User;
  }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
  
    if (!token) throw AuthErrorHandler.accessTokenNotFound();
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err, user) => {
      if (err) throw AuthErrorHandler.JWTExpired();
      
      if (user) {
        req.user = user;
      }
    });
  
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateToken;
