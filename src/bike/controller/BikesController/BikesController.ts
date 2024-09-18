import type { Model } from "mongoose";
import { type Request, type Response, type NextFunction } from "express";
import { type BikesControllerStructure } from "../types";
import type { BikeStructure, BikeStructureWithoutId } from "../../types";
import Bike from "../../model/Bike.js";
import type ServerError from "../../../server/error/ServerError/ServerError";

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
    req: Request<
      Record<string, any>,
      Record<string, any>,
      BikeStructureWithoutId
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const bikeData = req.body;
      const addedBike = await Bike.create(bikeData);

      res.status(201).json({ bike: addedBike });
    } catch (error) {
      (error as ServerError).statusCode = 409;
      (error as ServerError).message = "Could not add the desired bike!";

      next(error);
    }
  };
}

export default BikesController;
