import { BaseResponse } from "./base-response";

class ServerErrorResponse extends BaseResponse {
  constructor(body = {}) {
    super(500, body);
  }
}

export default ServerErrorResponse;
