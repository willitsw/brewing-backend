import { putRecipe } from "../../services/recipe-service";
import { BrewingTypes as BT } from "brewing-shared";
import SuccessResponse from "../../types/lambda-responses/success-response";
import { decodeToken } from "../../utilities/auth-helpers";
import { withErrorBoundary } from "../../utilities/error-boundary";

module.exports.handler = async (event) => {
  return await withErrorBoundary(async () => {
    const userId = decodeToken(event.headers.authorization).userId;
    const updatedRecipe: BT.Recipe = JSON.parse(event.body);
    await putRecipe(updatedRecipe, userId);
    return new SuccessResponse(updatedRecipe);
  });
};
