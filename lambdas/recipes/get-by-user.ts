import { queryRecipesByUser } from "../../services/recipeService";
import SuccessResponse from "../../types/lambda-responses/success-response";
import { getUidFromToken } from "../../utilities/auth-helpers";

module.exports.handler = async (event) => {
  const id = getUidFromToken(event.headers.authorization);
  const result = await queryRecipesByUser(id);
  return new SuccessResponse(result);
};
