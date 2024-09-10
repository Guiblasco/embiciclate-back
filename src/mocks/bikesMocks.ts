import { type BikeStructure } from "../bike/types";

export const bikesMocks: Array<Omit<BikeStructure, "id">> = [
  {
    brand: "Trek",
    model: "Madone sl 6",
    material: "Carbon",
    wheelsize: "700C",
    alternativeText: "",
    imageUrl: "",
    specs: "",
  },
  {
    brand: "Cannondale",
    model: "Scalpel",
    material: "Carbon",
    wheelsize: `29"`,
    alternativeText: "",
    imageUrl: "",
    specs: "",
  },
];
