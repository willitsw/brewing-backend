import { deleteRecipe } from "../../services/recipeService";
import SuccessResponse from "../../types/lambda-responses/success-response";

module.exports.handler = async (event) => {
  const id = event.pathParameters.id;
  await deleteRecipe(id);
  return new SuccessResponse();
};
