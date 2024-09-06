import request from "supertest";
import app from "../../app";

describe("Givent a GET / endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 status code with message 'Pong'", async () => {
      const path = "/";
      const statusCode = 200;
      const expectedMessage = "Pong";

      const response = await request(app).get(path).expect(statusCode);

      const responseBody = response.body as { message: string };

      expect(responseBody).toHaveProperty("message", expectedMessage);
    });
  });
});
