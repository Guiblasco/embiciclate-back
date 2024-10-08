import { type NextFunction, type Request, type Response } from "express";
import ServerError from "../ServerError/ServerError.js";
import { generalError } from "./generalError.js";

beforeAll(() => {
  jest.clearAllMocks();
});

describe("Given the function generalError", () => {
  const error = new ServerError("Not Found", 404);
  const req: Partial<Request> = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const next: NextFunction = jest.fn();

  describe("When it receives an error with 404 status code and message 'Not Found'", () => {
    test("Then it should call response's method status with 404", () => {
      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenLastCalledWith(error.statusCode);
    });

    test("Then it should call response's method json with error's message 'Not Found'", () => {
      const expectErrorMessage = { message: "Not Found" };

      generalError(error, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectErrorMessage);
    });
  });

  describe("When it receives an error with code 500 and message 'Server error'", () => {
    const statusCode = 500;
    const error = new Error("Server Error");

    test("Then it should call response's method status with 500", () => {
      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
    test("Then it should call response's method json with error's message 'Server error' ", () => {
      const expectErrorMessage = { message: "Server Error" };

      generalError(error, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectErrorMessage);
    });
  });
});
