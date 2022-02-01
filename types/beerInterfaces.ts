import { RecipeType } from "./beerJson";

export type DbType = { id: string; user: string };

export interface Recipe extends RecipeType, DbType {
  description?: string;
}
