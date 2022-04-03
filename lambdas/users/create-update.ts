import SuccessResponse from "../../types/lambda-responses/success-response";
import { decodeToken } from "../../utilities/auth-helpers";
import { withErrorBoundary } from "../../utilities/error-boundary";
import { BrewingTypes as BT } from "brewing-shared";
import { patchUser } from "../../services/user-service";

module.exports.handler = async (event) => {
  return await withErrorBoundary(async () => {
    const userId = decodeToken(event.headers.authorization).userId;
    const user: BT.User = JSON.parse(event.body);
    await patchUser(user, userId);
    return new SuccessResponse(user);
  });
};
