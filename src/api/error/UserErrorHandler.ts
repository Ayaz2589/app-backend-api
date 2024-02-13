import { NextFunction, Request, Response } from "express";

class UserErrorHandler {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }

  static userNotFound() {
    return new UserErrorHandler(404, "User Not Found");
  }

  static userAlreadyExists() {
    return new UserErrorHandler(409, "User Already Exists");
  }

  static unableToUpdateUser() {
    return new UserErrorHandler(400, "Unable to update user");
  }

  static invalidPassword() {
    return new UserErrorHandler(401, "Invalid Password");
  }

  static serverError() {
    return new UserErrorHandler(500, "Internal server error");
  }

  getStatusCode() {
    return this.statusCode;
  }

  getMessage() {
    return this.message;
  }
}

export default UserErrorHandler;