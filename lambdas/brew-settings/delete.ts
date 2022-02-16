import {
  deleteBrewSetting,
  getBrewSettingById,
} from "../../services/brew-settings-service";
import SuccessResponse from "../../types/lambda-responses/success-response";
import UnauthorizedResponse from "../../types/lambda-responses/unauthorized-responxe";
import { decodeToken } from "../../utilities/auth-helpers";
import { withErrorBoundary } from "../../utilities/error-boundary";

module.exports.handler = async (event) => {
  return await withErrorBoundary(async () => {
    const user = decodeToken(event.headers.authorization);
    const brewSettings = await getBrewSettingById(user);
    if (brewSettings.userId !== user.userId) {
      return new UnauthorizedResponse();
    }
    await deleteBrewSetting(brewSettings.userId);
    return new SuccessResponse();
  });
};
