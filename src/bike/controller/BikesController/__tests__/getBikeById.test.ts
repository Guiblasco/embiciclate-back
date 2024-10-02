import { type NextFunction, type Response } from "express";
import { type Model } from "mongoose";
import { type BikeStructure } from "../../../types";
import { type RequestWithBikeId } from "../../types";
import BikesController from "../BikesController";
import ServerError from "../../../../server/error/ServerError/ServerError";

const bikeMock: BikeStructure = {
  _id: "1234",
  alternativeText: "",
  brand: "",
  imageUrl: "",
  material: "",
  mode: "",
  model: "",
  specs: "",
  wheelSize: 0,
};

beforeAll(() => {
  jest.clearAllMocks();
});

describe("Given the getBikeById method from the BikeController", () => {
  describe("When it receives a bike with id: 1234", () => {
    const req: Partial<RequestWithBikeId> = {
      params: {
        bikeId: bikeMock._id,
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next: NextFunction = jest.fn();

    const bikeModel: Partial<Model<BikeStructure>> = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(bikeMock),
      }),
    };

    const controller = new BikesController(bikeModel as Model<BikeStructure>);
    test("Then it should call the response's status method with 200", async () => {
      await controller.getBikeById(
        req as RequestWithBikeId,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });
    test("Then it should call response's json method with the found bike ", async () => {
      const expectedBody = { bikeToShow: bikeMock };

      await controller.getBikeById(
        req as RequestWithBikeId,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith(expectedBody);
    });

    test("Then it should call next function with an error", async () => {
      const bikeModel: Partial<Model<BikeStructure>> = {
        findById: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      };

      const controller = new BikesController(bikeModel as Model<BikeStructure>);

      const findBikeError = new ServerError(
        "Bike not found with provided Id",
        404,
      );
      await controller.getBikeById(
        req as RequestWithBikeId,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(findBikeError);
    });
  });
});
