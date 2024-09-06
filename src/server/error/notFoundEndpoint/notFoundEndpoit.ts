import { type NextFunction, type Request, type Response } from "express";
import ServerError from "../ServerError/ServerError.js";

const notFoundEndpoint = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const error = new ServerError("Endpoind not found", 404);

  next(error);
};

export default notFoundEndpoint;
