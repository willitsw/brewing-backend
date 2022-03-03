import { MeasurementType } from "./brew-settings";

export type RecipeType = "Other" | "Extract" | "Partial mash" | "All grain";

export enum Step {
  StrikeWater = "Strike Water",
  Mash = "Mash",
  Boil = "Boil",
  Fermentor = "Fermentor",
  Bottle = "Bottle",
}
export interface IngredientType {
  step: Step;
  timing: number;
  notes: string;
}

export interface Recipe {
  id: string;
  user: string;
  description?: string;
  name: string;
  type: RecipeType;
  author: string;
  createdDate?: string;
  updatedDate?: string;
  measurementType: MeasurementType;
  batchSize: number;
  efficiency: number;
  fermentables: Fermentable[];
  hops: Hop[];
  cultures: Culture[];
  nonFermentables: NonFermentable[];
}

export type FermentableType =
  | "Other"
  | "Liquid extract"
  | "Dry extract"
  | "Grain"
  | "Sugar"
  | "Fruit"
  | "Juice"
  | "Honey";

export interface Fermentable extends IngredientType {
  name: string;
  lovibond: number;
  type: FermentableType;
  gravity: number;
  amount: number;
}
export interface Hop extends IngredientType {
  name: string;
  alphaAcid: number;
  amount: number;
}

export type CultureForm = "Liquid" | "Dry";

export interface Culture extends IngredientType {
  name: string;
  attenuation: number;
  form: CultureForm;
  notes: string;
}

export interface NonFermentable extends IngredientType {
  name: string;
  amount: string;
  notes: string;
}
