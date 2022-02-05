import { BaseResponse } from "./base-response";

class UnauthorizedResponse extends BaseResponse {
  constructor(body = {}) {
    super(401, body);
  }
}

export default UnauthorizedResponse;
