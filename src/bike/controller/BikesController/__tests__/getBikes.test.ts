import { type NextFunction, type Request, type Response } from "express";
import { type BikeStructure } from "../../../types";
import { type Model } from "mongoose";
import BikesController from "../BikesController";
import { bikesMocks } from "../../../../mocks/bikesMocks";
import ServerError from "../../../../server/error/ServerError/ServerError";

describe("Given the getBikes method from BikesController class", () => {
  describe("When it receives a request", () => {
    const bikeModel: Partial<Model<BikeStructure>> = {
      find: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(bikesMocks),
      }),
    };
    const bikesController = new BikesController(
      bikeModel as Model<BikeStructure>,
    );
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const next: NextFunction = jest.fn().mockReturnThis();

    test("Then it should call response's method status with 200 and method json with an array of 2 bikes", async () => {
      await bikesController.getBikes(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ bikes: bikesMocks }),
      );
    });
  });
});
