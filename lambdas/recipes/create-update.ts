import { putRecipe } from "../../services/recipeService";
import SuccessResponse from "../../types/lambda-responses/success-response";

module.exports.handler = async (event) => {
  const updatedRecipe = JSON.parse(event.body);
  await putRecipe(updatedRecipe);
  return new SuccessResponse(updatedRecipe);
};
