import { deleteRecipe } from "../../services/recipeService";
import SuccessResponse from "../lambda-responses/success-response";

module.exports.handler = async (event, context) => {
  const id = event.pathParameters.id;
  await deleteRecipe(id);
  return new SuccessResponse();
};
