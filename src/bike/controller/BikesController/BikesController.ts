import type { Model } from "mongoose";
import { type Request, type Response, type NextFunction } from "express";
import {
  type RequestWithBikeId,
  type BikesControllerStructure,
} from "../types";
import type { BikeStructure } from "../../types";
import ServerError from "../../../server/error/ServerError/ServerError.js";
import chalk from "chalk";

class BikesController implements BikesControllerStructure {
  constructor(private readonly bikeModel: Model<BikeStructure>) {}

  getBikes = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> => {
    try {
      const bikes = await this.bikeModel.find().exec();

      if (!bikes) {
        throw new Error(`Couldn't get bikes from database`);
      }

      res.status(200).json({ bikes });
    } catch (error) {}
  };

  addBikes = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const addedBike = await this.bikeModel.create(req.body);

      if (!addedBike) {
        throw new Error(`Bike already exist!`);
      }

      res.status(201).json({ bike: addedBike });
    } catch (error) {
      (error as ServerError).statusCode = 409;
      (error as ServerError).message = "Could not add the desired bike!";

      next(error);
    }
  };

  deleteBikeById = async (
    req: RequestWithBikeId,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { bikeId } = req.params;
    try {
      const bikeToDelete = await this.bikeModel.findByIdAndDelete(bikeId);

      if (!bikeToDelete) {
        throw new Error(`Bike not found with ID: ${bikeToDelete}`);
      }

      res.status(200).json({ bikeToDelete });
    } catch (error) {
      console.log(chalk.redBright((error as { message: string }).message));

      const findBikeError = new ServerError(
        "Bike not found with provided Id",
        404,
      );
      next(findBikeError);
    }
  };
}

export default BikesController;
