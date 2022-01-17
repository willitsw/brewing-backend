import { RecipeType } from "./beerJson";

export type DbType = { id: string; user: string };

export interface IRecipe extends RecipeType, DbType {}
