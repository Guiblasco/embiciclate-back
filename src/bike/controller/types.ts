import type { NextFunction, Request, Response } from "express";
import { type BikeStructureWithoutId } from "../types";

export interface BikesControllerStructure {
  getBikes: (req: Request, res: Response, next: NextFunction) => void;
  addBikes: (req: Request, res: Response, next: NextFunction) => void;
  deleteBikeById: (req: Request, res: Response, next: NextFunction) => void;
  getBikeById: (req: Request, res: Response, next: NextFunction) => void;
}

export type RequestWithBikeId = Request<{ bikeId: string }>;

export type RequestWithBike = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  BikeStructureWithoutId
>;
