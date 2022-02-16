import ServerErrorResponse from "../types/lambda-responses/server-error-response";

export const withErrorBoundary = async (f: () => Promise<any>) => {
  try {
    return await f();
  } catch (e) {
    console.log(e);
    return new ServerErrorResponse();
  }
};
