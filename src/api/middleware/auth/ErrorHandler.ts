import { Request, Response, NextFunction } from 'express';
import { errorLogger } from '../../error';
import { AuthErrorHandler } from '../../error';

const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  errorLogger.logError(err);

  if (err instanceof AuthErrorHandler) {
    res.status(err.statusCode).send({ err });
    return
  }

  res.status(500).send("Something went wrong");
}

export default ErrorHandler;