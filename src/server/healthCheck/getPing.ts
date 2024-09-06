import type { Request, Response } from "express";

const getPing = (req: Request, res: Response): void => {
  res.status(200).json({ message: "Pong" });
};

export default getPing;
