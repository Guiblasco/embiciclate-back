import { type NextFunction, type Request, type Response } from "express";
import notFoundError from "../notFoundError";
import ServerError from "../../ServerError/ServerError";

describe("Given the function notFoundEndpoint", () => {
  describe("When it receives an unknown path", () => {
    test("Then it should return the message Endpoint not found", () => {
      const req: Partial<Request> = {};
      const res: Partial<Response> = {};
      const next: NextFunction = jest.fn();

      notFoundError(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new ServerError("Endpoint not found", 404),
      );
    });
  });
});
