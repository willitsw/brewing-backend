import { IRecipe } from "../../types/beerInterfaces";
import {
  putItem,
  getItem,
  queryItemsByUser,
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
