export interface BikeStructure {
  _id: string;
  brand: string;
  model: string;
  wheelSize: number;
  material: string;
  specs: string;
  imageUrl: string;
  alternativeText: string;
  mode: string;
}

export type BikeStructureWithoutId = Omit<BikeStructure, "_id">;
