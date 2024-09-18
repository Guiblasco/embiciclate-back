import { type NextFunction, type Request, type Response } from "express";
import mongoose, { type Model } from "mongoose";
import BikesController from "../BikesController";
import {
  type BikeStructure,
  type BikeStructureWithoutId,
} from "../../../types";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDataBase from "../../../../database";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDataBase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given de method addBikes from BikesController class", () => {
  describe("When it receives a request with a bike data", () => {
    test("Then it should call response's status method with 201", async () => {
      const req: Partial<Request> = {
        body: {
          brand: "trek",
          model: "xhofgjrtsdgasdgtila",
          alternativeText: "Bicicleta de montaña Specialized Rockhopper Expert",
          specs:
            "Cuadro de aluminio ligero, frenos de disco hidráulicos, horquilla de s…",
          imageUrl: "https://i.ibb.co/s9kGk9d/ROCKHOPPER-EXPERT-29.webp",
          material: "Aluminio",
          wheelSize: "29",
          mode: "XC",
        },
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const next: NextFunction = jest.fn();

      const bikeModel: Partial<Model<BikeStructure>> = {
        create: jest.fn().mockReturnValue({ brand: "trek" }),
      };
      const bikesController = new BikesController(
        bikeModel as Model<BikeStructure>,
      );

      await bikesController.addBikes(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });
    test("Then it should call response's json method with bike data", async () => {
      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const next: NextFunction = jest.fn();

      const bikeModel: Partial<Model<BikeStructure>> = {
        create: jest.fn().mockReturnValue({ brand: "trek" }),
      };

      const bikesController = new BikesController(
        bikeModel as Model<BikeStructure>,
      );

      await bikesController.addBikes(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ bike: { brand: "trek" } });
    });
  });
});
