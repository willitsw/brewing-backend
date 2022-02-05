import { deleteRecipe, getRecipeById } from "../../services/recipeService";
import SuccessResponse from "../../types/lambda-responses/success-response";
import UnauthorizedResponse from "../../types/lambda-responses/unauthorized-responxe";
import { getUidFromToken } from "../../utilities/auth-helpers";

module.exports.handler = async (event) => {
  const userId = getUidFromToken(event.headers.authorization);
  const id = event.pathParameters.id;
  const recipe = await getRecipeById(id);
  if (recipe.user !== userId) {
    return new UnauthorizedResponse();
  }
  await deleteRecipe(id);
  return new SuccessResponse();
};
