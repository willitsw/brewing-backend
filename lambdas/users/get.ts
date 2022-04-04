import "dotenv/config";
import SuccessResponse from "../../types/lambda-responses/success-response";
import { decodeToken } from "../../utilities/auth-helpers";
import { getUserById } from "../../services/brew-settings-service";
import { withErrorBoundary } from "../../utilities/error-boundary";

module.exports.handler = async (event) => {
  return await withErrorBoundary(async () => {
    const user = decodeToken(event.headers.authorization);
    const result = await getUserById(user);
    return new SuccessResponse(result);
  });
};
