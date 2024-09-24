import type { NextFunction, Request, Response } from "express";

export interface BikesControllerStructure {
  getBikes: (req: Request, res: Response, next: NextFunction) => void;
  addBikes: (req: Request, res: Response, next: NextFunction) => void;
  deleteBikeById: (req: Request, res: Response, next: NextFunction) => void;
}

export type RequestWithBikeId = Request<{ bikeId: string }>;
