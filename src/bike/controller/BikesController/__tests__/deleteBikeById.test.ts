import { json, type NextFunction, type Response } from "express";
import { type BikeStructure } from "../../../types";
import { type RequestWithBikeId } from "../../types";
import { type Model } from "mongoose";
import BikesController from "../BikesController";

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

describe("Given the deleteBikeById method from the BikeController", () => {
  describe("When it receives a bike with id: '1234'", () => {
    const req: Partial<RequestWithBikeId> = {
      params: {
        bikeId: bikeMock._id,
      },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const next: NextFunction = jest.fn();

    const bikeModel: Partial<Model<BikeStructure>> = {
      findByIdAndDelete: jest.fn().mockResolvedValue(bikeMock),
    };

    const controller = new BikesController(bikeModel as Model<BikeStructure>);

    test("Then it should call the response's status method with 200", async () => {
      await controller.deleteBikeById(
        req as RequestWithBikeId,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Then it should call response's json method with the message Successfully deleted bike", async () => {
      const expectedMessage = "Successfully deleted bike";

      await controller.deleteBikeById(
        req as RequestWithBikeId,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});
