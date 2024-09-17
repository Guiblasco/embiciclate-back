import type { Model } from "mongoose";
import type { BikeStructure } from "../../types";
import { type Request, type Response, type NextFunction, json } from "express";
import { type BikesControllerStructure } from "../types";
import Bike from "../../model/Bike";

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

  addBikes = async (
    req: Request<Record<string, any>, Record<string, any>, BikeStructure>,
    _res: Response,
    _next: NextFunction,
  ): Promise<void> => {
    const bikeData = req.body;
    console.log(bikeData);
  };
}

export default BikesController;
