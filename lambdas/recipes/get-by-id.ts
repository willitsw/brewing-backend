import { isEmptyOrNullObject } from "../../utilities/misc";
import { getRecipeById } from "../../services/recipeService";
import SuccessResponse from "../lambda-responses/success-response";
import NotFoundResponse from "../lambda-responses/not-found-response";

module.exports.handler = async (event, context) => {
  const id = event.pathParameters.id;
  const result = await getRecipeById(id);
  if (isEmptyOrNullObject(result)) {
    return new NotFoundResponse(`Recipe with id ${id} not found`);
  }
  return new SuccessResponse(result);
};
