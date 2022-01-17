import { isEmptyOrNullObject } from "../../utilities/misc";
import { getRecipeById } from "../../services/recipeService";

module.exports.handler = async (event, context) => {
  console.log("get by id is trying to start");
  const result = await getRecipeById("1");
  if (isEmptyOrNullObject(result)) {
    return "recipe not found";
  }
  return result;
};
