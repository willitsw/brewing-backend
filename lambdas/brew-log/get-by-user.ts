import { queryBrewLogsByUser } from "../../services/brew-log-service";
import SuccessResponse from "../../types/lambda-responses/success-response";
import { decodeToken } from "../../utilities/auth-helpers";
import { withErrorBoundary } from "../../utilities/error-boundary";

module.exports.handler = async (event) => {
  return await withErrorBoundary(async () => {
    const id = decodeToken(event.headers.authorization).userId;
    const result = await queryBrewLogsByUser(id);
    return new SuccessResponse(result);
  });
};
