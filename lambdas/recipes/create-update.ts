import { putRecipe } from "../../services/recipe-service";
import { BrewingTypes as BT } from "brewing-shared";
import SuccessResponse from "../../types/lambda-responses/success-response";
import UnauthorizedResponse from "../../types/lambda-responses/unauthorized-responxe";
import { decodeToken } from "../../utilities/auth-helpers";
import { withErrorBoundary } from "../../utilities/error-boundary";

module.exports.handler = async (event) => {
  return await withErrorBoundary(async () => {
    const userId = decodeToken(event.headers.authorization).userId;
    const updatedRecipe: BT.Recipe = JSON.parse(event.body);
    if (updatedRecipe.userId !== userId) {
      return new UnauthorizedResponse();
    }
    await putRecipe(updatedRecipe);
    return new SuccessResponse(updatedRecipe);
  });
};
