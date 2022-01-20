import { IRecipe } from "../../types/beerInterfaces";
import {
  putItem,
  getItem,
  queryItemsByUser,
  deleteItem,
} from "../utilities/dynamo/dynamoHelpers";

export const putRecipe = async (recipe: IRecipe): Promise<void> => {
  await putItem(recipe, "recipes");
};

export const getRecipeById = async (id: string): Promise<IRecipe> => {
  return await getItem(id, "recipes");
};

export const queryRecipesByUser = async (
  userId: string
): Promise<IRecipe[]> => {
  return await queryItemsByUser(userId, "recipes");
};

export const deleteRecipe = async (id: string): Promise<void> => {
  return await deleteItem(id, "recipes");
};