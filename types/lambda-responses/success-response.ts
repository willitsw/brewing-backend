import { BaseResponse } from "./base-response";

class SuccessResponse extends BaseResponse {
  constructor(body = {}) {
    super(200, body);
  }
}

export default SuccessResponse;
