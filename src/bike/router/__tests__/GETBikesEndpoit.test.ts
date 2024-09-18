import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectToDataBase from "../../../database";
import { bikesMocks } from "../../../mocks/bikesMocks";
import Bike from "../../model/Bike";
import app from "../../../server/app";
import { type BikeStructure } from "../../types";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDataBase(server.getUri());
  await Bike.insertMany(bikesMocks);
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given the  GET /bikes endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respont with 200 and collection of bikes", async () => {
      const path = "/bikes";
      const statusCode = 200;
      const bikeProperty = "bikes";

      const response = await request(app).get(path).expect(statusCode);

      const resposeBody = response.body as { bikes: BikeStructure[] };

      expect(resposeBody).toHaveProperty(bikeProperty);
    });
  });
});
