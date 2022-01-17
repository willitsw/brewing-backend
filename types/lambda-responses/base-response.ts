import { StatusCode } from "aws-sdk/clients/apigateway";

type StatusCodes = 200 | 500 | 404;

interface ILambdaResponse {
  statusCode: StatusCodes;
  headers: object;
  body: object;
}

export class BaseResponse implements ILambdaResponse {
  public statusCode: StatusCodes;
  public headers: object = {
    "Content-Type": "application/json",
  };
  public body: object;

  constructor(statusCode: StatusCodes, body = {}) {
    this.statusCode = statusCode;
    this.body = body;
  }
}
