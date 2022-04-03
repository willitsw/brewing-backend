import { BaseResponse } from "./base-response";

class ForbiddenResponse extends BaseResponse {
  constructor(body = {}) {
    super(403, body);
  }
}

export default ForbiddenResponse;
