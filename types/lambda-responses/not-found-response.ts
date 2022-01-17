import { BaseResponse } from "./base-response";

class NotFoundResponse extends BaseResponse {
  constructor(body = {}) {
    super(404, body);
  }
}

export default NotFoundResponse;
