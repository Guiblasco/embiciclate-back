import type { NextFunction, Request, Response } from "express";

export interface BikesControllerStructure {
  getBikes: (req: Request, res: Response, next: NextFunction) => void;
}
