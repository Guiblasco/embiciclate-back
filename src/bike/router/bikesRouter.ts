import express from "express";
import BikesController from "../controller/BikesController/BikesController.js";
import Bike from "../model/Bike.js";

const bikesRouter = express.Router();

const bikesController = new BikesController(Bike);

bikesRouter.get("/", bikesController.getBikes);

bikesRouter.post("/", bikesController.addBikes);

export default bikesRouter;
