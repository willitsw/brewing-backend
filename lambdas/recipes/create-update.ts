import { putRecipe } from "../../services/recipeService";
import SuccessResponse from "../lambda-responses/success-response";

module.exports.handler = async (event, context) => {
  const updatedRecipe = JSON.parse(event.body);
  await putRecipe(updatedRecipe);
  return new SuccessResponse(updatedRecipe);
};
