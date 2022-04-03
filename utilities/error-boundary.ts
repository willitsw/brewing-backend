import ForbiddenResponse from "../types/lambda-responses/forbidden-response";
import NotFoundResponse from "../types/lambda-responses/not-found-response";
import ServerErrorResponse from "../types/lambda-responses/server-error-response";
import UnauthorizedResponse from "../types/lambda-responses/unauthorized-responxe";

export const withErrorBoundary = async (f: () => Promise<any>) => {
  try {
    return await f();
  } catch (e) {
    console.log(e);
    // TODO: return a correlation id or something to tie the api response to cloudwatch logs
    switch (e) {
      case e.includes("{Not Found}"):
        return new NotFoundResponse();
      case e.includes("{Forbidden}"):
        return new ForbiddenResponse();
      case e.includes("{Unauthorized}"):
        return new UnauthorizedResponse();
      default:
        return new ServerErrorResponse();
    }
  }
};
