import request from "supertest";
import app from "../../../app";

describe("Given the non-existent GET /barracuda endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with 404 Endpoint not found", async () => {
      const path = "/barracuda";
      const expectedStatusCode = 404;
      const expectedMessage = "Endpoint not found";

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { message: string };

      expect(responseBody).toHaveProperty("message", expectedMessage);
    });
  });
});
