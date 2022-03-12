import { BrewingTypes as BT } from "brewing-shared";
import {
  putItem,
  getItem,
  queryItemsByUser,
  deleteItem,
} from "../utilities/dynamo-helpers";

export const putRecipe = async (recipe: BT.Recipe): Promise<void> => {
  await putItem(recipe, "recipes");
};

export const getRecipeById = async (id: string): Promise<BT.Recipe> => {
  return (await getItem(id, "recipes", "id")) as BT.Recipe;
};

export const queryRecipesByUser = async (
  userId: string
): Promise<BT.Recipe[]> => {
  return (await queryItemsByUser(userId, "recipes")) as BT.Recipe[];
};

export const deleteRecipe = async (id: string): Promise<void> => {
  return await deleteItem(id, "recipes", "id");
};
