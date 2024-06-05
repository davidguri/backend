import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError';

export function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction): void {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
}