import { BrewingTypes as BT } from "brewing-shared";
import SuccessResponse from "../../types/lambda-responses/success-response";
import UnauthorizedResponse from "../../types/lambda-responses/unauthorized-responxe";
import { decodeToken } from "../../utilities/auth-helpers";
import { withErrorBoundary } from "../../utilities/error-boundary";
import { putBrewLog } from "../../services/brew-log-service";

module.exports.handler = async (event) => {
  return await withErrorBoundary(async () => {
    const userId = decodeToken(event.headers.authorization).userId;
    const updatedBrewLog: BT.BrewLog = JSON.parse(event.body);
    if (updatedBrewLog.userId !== userId) {
      return new UnauthorizedResponse();
    }
    await putBrewLog(updatedBrewLog);
    return new SuccessResponse(updatedBrewLog);
  });
};
