import { json, raw, type Request, type Response } from "express";
import getPing from "./getPing";

describe("Given the function getPing", () => {
  describe("When it receives a request", () => {
    const statusCode = 200;
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    test("Then it should call response's method status with 200", () => {
      getPing(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call response's json method with a message property values 'Pong'", () => {
      const expectMessage = { message: "Pong" };

      getPing(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectMessage);
    });
  });
});
