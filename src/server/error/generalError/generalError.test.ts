import { type NextFunction, type Request, type Response } from "express";
import ServerError from "../ServerError/ServerError.js";
import { generalError } from "./generalError.js";

describe("Given the function generalError", () => {
  describe("When it receives an error with 404 status code and message 'Not Found'", () => {
    test("Then it should call response's method status with 404", () => {
      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const error = new ServerError("Not Found", 404);
      const next: NextFunction = jest.fn();

      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenLastCalledWith(error.statusCode);
    });
  });
});
