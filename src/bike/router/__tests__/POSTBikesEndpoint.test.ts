import request from "supertest";
import { type BikeStructure } from "../../types";
import app from "../../../server/app";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectToDataBase from "../../../database";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDataBase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given the POST '/bikes' endpoint", () => {
  describe("When it receives a request with bike data", () => {
    test("Then it should respond with 201 and new bike created", async () => {
      const path = "/bikes";
      const statusCode = 201;
      const bike: Omit<BikeStructure, "_id"> = {
        brand: "trek",
        model: "Domane",
        alternativeText: "Bicicleta de montaña Specialized Rockhopper Expert",
        specs:
          "Cuadro de aluminio ligero, frenos de disco hidráulicos, horquilla de s…",
        imageUrl: "https://i.ibb.co/s9kGk9d/ROCKHOPPER-EXPERT-29.webp",
        material: "Aluminio",
        wheelSize: 29,
        mode: "XC",
      };

      const response = await request(app)
        .post(path)
        .send(bike)
        .expect(statusCode);

      const responseBody = response.body as BikeStructure;

      expect(responseBody.brand).toBe("trek");
    });
  });
});
