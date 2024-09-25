import { bikesMocks } from "../../../mocks/bikesMocks";
import request from "supertest";
import Bike from "../../model/Bike";
import app from "../../../server/app";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDataBase from "../../../database";
import mongoose from "mongoose";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDataBase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await Bike.deleteMany();
});

describe("Given the DELETE /bikes endpoint", () => {
  describe("When it receives a request with one bike id", () => {
    beforeEach(async () => {
      await Bike.create(bikesMocks[0]);
    });
    test("Then it should respond with 200 and the message 'Successfully deleted bike'", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "Successfully deleted bike";
      const bikes = await Bike.find().exec();
      const path = `/bikes/${bikes[0]._id.toString()}`;

      const response = await request(app)
        .delete(path)
        .expect(expectedStatusCode);

      const responseBode = response.body as { message: string };

      expect(responseBode.message).toBe(expectedMessage);
    });
  });
});
