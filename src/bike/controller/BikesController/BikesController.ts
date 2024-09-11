import type { Model } from "mongoose";
import type { BikeStructure } from "../../types";
import { type Request, type Response, type NextFunction } from "express";
import { type BikesControllerStructure } from "../types";

class BikesController implements BikesControllerStructure {
  constructor(private readonly bikeModel: Model<BikeStructure>) {}

  getBikes = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> => {
    const bikes = await this.bikeModel.find().exec();

    res.status(200).json({ bikes });
  };
}

export default BikesController;
