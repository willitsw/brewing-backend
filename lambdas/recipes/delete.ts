import { deleteRecipe, getRecipeById } from "../../services/recipe-service";
import SuccessResponse from "../../types/lambda-responses/success-response";
import UnauthorizedResponse from "../../types/lambda-responses/unauthorized-responxe";
import { decodeToken } from "../../utilities/auth-helpers";
import { withErrorBoundary } from "../../utilities/error-boundary";

module.exports.handler = async (event) => {
  return await withErrorBoundary(async () => {
    const userId = decodeToken(event.headers.authorization).userId;
    const id = event.pathParameters.id;
    const recipe = await getRecipeById(id);
    if (recipe.userId !== userId) {
      return new UnauthorizedResponse();
    }
    await deleteRecipe(id);
    return new SuccessResponse();
  });
};
