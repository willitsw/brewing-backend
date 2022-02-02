import { StatusCode } from "aws-sdk/clients/apigateway";

type StatusCodes = 200 | 500 | 404;

interface LambdaResponseInterface {
  statusCode: StatusCodes;
  headers: object;
  body: string;
}

export class BaseResponse implements LambdaResponseInterface {
  public statusCode: StatusCodes;
  public headers: object = {
    "Content-Type": "application/json",
  };
  public body: string;

  constructor(statusCode: StatusCodes, body = {}) {
    this.statusCode = statusCode;
    this.body = JSON.stringify(body);
  }
}
