import mongoose from "mongoose";
import bikeSchema from "./schema/bikeSchema.js";

const Bike = mongoose.model("Bike", bikeSchema, "bikes");

export default Bike;
