import { putRecipe } from "../../services/recipeService";
import { Recipe } from "../../types/beerInterfaces";
import SuccessResponse from "../../types/lambda-responses/success-response";
import UnauthorizedResponse from "../../types/lambda-responses/unauthorized-responxe";
import { getUidFromToken } from "../../utilities/auth-helpers";

module.exports.handler = async (event) => {
  const userId = getUidFromToken(event.headers.authorization);
  const updatedRecipe: Recipe = JSON.parse(event.body);
  if (updatedRecipe.user !== userId) {
    return new UnauthorizedResponse();
  }
  await putRecipe(updatedRecipe);
  return new SuccessResponse(updatedRecipe);
};
