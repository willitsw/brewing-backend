import { isEmptyOrNullObject } from "../../utilities/misc";
import { queryRecipesByUser } from "../../services/recipeService";
import SuccessResponse from "../lambda-responses/success-response";
import NotFoundResponse from "../lambda-responses/not-found-response";

module.exports.handler = async (event, context) => {
  const id = event.pathParameters.id;
  const result = await queryRecipesByUser(id);
  if (isEmptyOrNullObject(result)) {
    return new NotFoundResponse(`No recipes found for user ${id}`);
  }
  return new SuccessResponse(result);
};
