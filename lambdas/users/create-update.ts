import SuccessResponse from "../../types/lambda-responses/success-response";
import UnauthorizedResponse from "../../types/lambda-responses/unauthorized-responxe";
import { decodeToken } from "../../utilities/auth-helpers";
import { withErrorBoundary } from "../../utilities/error-boundary";
import { BrewingTypes as BT } from "brewing-shared";
import { putUser } from "../../services/brew-settings-service";

module.exports.handler = async (event) => {
  return await withErrorBoundary(async () => {
    const userId = decodeToken(event.headers.authorization).userId;
    const updatedUser: BT.User = JSON.parse(event.body);
    if (updatedUser.id !== userId) {
      return new UnauthorizedResponse();
    }
    await putUser(updatedUser);
    return new SuccessResponse(updatedUser);
  });
};
