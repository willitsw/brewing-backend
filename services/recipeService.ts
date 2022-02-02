import { Recipe } from "../types/beerInterfaces";
import {
  putItem,
  getItem,
  queryItemsByUser,
  deleteItem,
} from "../utilities/dynamo/dynamoHelpers";

export const putRecipe = async (recipe: Recipe): Promise<void> => {
  await putItem(recipe, "recipes");
};

export const getRecipeById = async (id: string): Promise<Recipe> => {
  return (await getItem(id, "recipes")) as Recipe;
};

export const queryRecipesByUser = async (userId: string): Promise<Recipe[]> => {
  return (await queryItemsByUser(userId, "recipes")) as Recipe[];
};

export const deleteRecipe = async (id: string): Promise<void> => {
  return await deleteItem(id, "recipes");
};
