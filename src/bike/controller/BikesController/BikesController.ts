import type { Model } from "mongoose";
import { type Request, type Response, type NextFunction } from "express";
import {
  type RequestWithBikeId,
  type BikesControllerStructure,
  type RequestWithBike,
} from "../types";
import type { BikeStructure } from "../../types";
import ServerError from "../../../server/error/ServerError/ServerError.js";
import chalk from "chalk";

class BikesController implements BikesControllerStructure {
  constructor(private readonly bikeModel: Model<BikeStructure>) {}

  getBikes = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const bikes = await this.bikeModel.find().exec();

      if (!bikes) {
        throw new Error(`Couldn't get bikes from database`);
      }

      res.status(200).json({ bikes });
    } catch (error) {
      next(error);
    }
  };

  addBikes = async (
    req: RequestWithBike,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { model } = req.body;
    try {
      const bikeAtDataBase = await this.bikeModel.findOne({ model });

      if (bikeAtDataBase) {
        throw new ServerError(`Bike already exist!`, 409);
      }

      const addedBike: BikeStructure = await this.bikeModel.create(req.body);

      res.status(201).json(addedBike);
    } catch (error) {
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

      res.status(200).json({ message: "Successfully deleted bike" });
    } catch (error) {
      console.log(chalk.redBright((error as { message: string }).message));

      const findBikeError = new ServerError(
        "Bike not found with provided Id",
        404,
      );
      next(findBikeError);
    }
  };

  getBikeById = async (
    req: RequestWithBikeId,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { bikeId } = req.params;

    try {
      const bikeToShow = await this.bikeModel.findById(bikeId).exec();

      if (!bikeToShow) {
        throw new Error(`Bike not found with ID: ${bikeToShow}`);
      }

      res.status(200).json({ bikeToShow });
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
