import { type NextFunction, type Request, type Response } from "express";
import { type BikeStructure } from "../../../types";
import { type Model } from "mongoose";
import BikesController from "../BikesController";
import { bikesMocks } from "../../../../mocks/bikesMocks";

beforeEach(() => {
  jest.clearAllMocks();
});

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

    test("Then it should call response's method status with 200 ", async () => {
      await bikesController.getBikes(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Then it should call response's method json with a bikes collection", async () => {
      await bikesController.getBikes(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ bikes: bikesMocks }),
      );
    });
  });
  describe("When the client throws erros if he can't find bikes", () => {
    test("Then it should call next function with an error message 'Couldn't get bikes from database'", async () => {
      const findBikesError = new Error(`Couldn't get bikes from database`);
      const bikeModel: Partial<Model<BikeStructure>> = {
        find: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
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

      await bikesController.getBikes(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(findBikesError);
    });
  });
});
