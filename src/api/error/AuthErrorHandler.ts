import { NextFunction, Request, Response } from "express";

class AuthErrorHandler {
  private statusCode: number;
  private message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }

  static unauthorizedUser() {
    return new AuthErrorHandler(401, "Unauthorized: User Not Found");
  }

  static unauthorizedPassword() {
    return new AuthErrorHandler(401, "Unauthorized: Incorrect Password");
  }

  static unauthorized() {
    return new AuthErrorHandler(401, "Unauthorized");
  }

  static forbidden() {
    return new AuthErrorHandler(403, "Forbidden");
  }

  static JWTExpired() {
    return new AuthErrorHandler(403, "JWT token expired");
  }

  static refreshTokenNotFound() {
    return new AuthErrorHandler(401, "Refresh token not found");
  }

  static serverError() {
    return new AuthErrorHandler(500, "Internal server error");
  }

  getStatusCode() {
    return this.statusCode;
  }

  getMessage() {
    return this.message;
  }

  send(res: Response) {
    return res.status(this.statusCode).send({ error: this.message });
  }
}

export default AuthErrorHandler;