import { isEmptyOrNullObject } from "../../utilities/misc";
import { getRecipeById } from "../../services/recipe-service";
import SuccessResponse from "../../types/lambda-responses/success-response";
import NotFoundResponse from "../../types/lambda-responses/not-found-response";
import { decodeToken } from "../../utilities/auth-helpers";
import UnauthorizedResponse from "../../types/lambda-responses/unauthorized-responxe";
import { withErrorBoundary } from "../../utilities/error-boundary";

module.exports.handler = async (event) => {
  return await withErrorBoundary(async () => {
    const userId = decodeToken(event.headers.authorization).userId;
    const id = event.pathParameters.id;
    const result = await getRecipeById(id);
    console.log(JSON.stringify(result));
    if (isEmptyOrNullObject(result)) {
      return new NotFoundResponse(`Recipe with id ${id} not found`);
    }
    if (result.userId !== userId) {
      return new UnauthorizedResponse();
    }
    return new SuccessResponse(result);
  });
};
