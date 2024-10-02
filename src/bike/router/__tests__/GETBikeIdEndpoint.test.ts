import { bikesMocks } from "../../../mocks/bikesMocks";
import app from "../../../server/app";
import Bike from "../../model/Bike";
import request from "supertest";
import { type BikeStructure } from "../../types";
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

describe("Given the GET /bikes/:bikeId endpoint", () => {
  describe("When it receives a Request with a bike _id and tihs bike exist in the database", () => {
    test("Then it should respond with 200 and the bike with the same ID", async () => {
      const mockBike = await Bike.create(bikesMocks[0]);
      const expectedId = mockBike._id.toString();
      const path = `/bikes/${expectedId}`;
      const expectedStatusCode = 200;

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { bikeToShow: BikeStructure };

      expect(responseBody).toHaveProperty("bikeToShow");
    });
  });
});
