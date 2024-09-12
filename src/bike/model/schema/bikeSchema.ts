import { Schema } from "mongoose";
import { type BikeStructure } from "../../types";

const bikeSchema = new Schema<BikeStructure>({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  wheelsize: {
    type: Number,
    required: true,
  },
  specs: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  alternativeText: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
});

export default bikeSchema;
