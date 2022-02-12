import { isEmptyOrNullObject } from "../../utilities/misc";
import { getRecipeById } from "../../services/recipeService";
import SuccessResponse from "../../types/lambda-responses/success-response";
import NotFoundResponse from "../../types/lambda-responses/not-found-response";
import { getUidFromToken } from "../../utilities/auth-helpers";
import UnauthorizedResponse from "../../types/lambda-responses/unauthorized-responxe";

module.exports.handler = async (event) => {
  const userId = getUidFromToken(event.headers.authorization);
  const id = event.pathParameters.id;
  const result = await getRecipeById(id);
  if (isEmptyOrNullObject(result)) {
    return new NotFoundResponse(`Recipe with id ${id} not found`);
  }
  if (result.user !== userId) {
    return new UnauthorizedResponse();
  }
  return new SuccessResponse(result);
};
