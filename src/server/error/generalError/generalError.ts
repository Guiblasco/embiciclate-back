import type { NextFunction, Request, Response } from "express";
import type ServerError from "../ServerError/ServerError.js";

export const generalError = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = (error as ServerError).statusCode ?? 500;

  res.status(statusCode).json({ message: error.message });
};
