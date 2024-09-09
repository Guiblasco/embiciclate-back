import mongoose from "mongoose";
import bikeSchema from "./schema/bikeSchema";

const Bike = mongoose.model("Bikes", bikeSchema, "bikes");

export default Bike;
