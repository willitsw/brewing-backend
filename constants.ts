interface Constants {
  readonly applicationPort: number;
  readonly dynamoDbLocation: string;
  readonly awsRegion: string;
  readonly environment: "development" | "staging" | "production";
}

let constants: Constants;

switch (process.env.APP_ENV) {
  case "production":
    constants = {
      applicationPort: 5000,
      dynamoDbLocation: "https://dynamodb.us-east-2.amazonaws.com",
      awsRegion: "us-east-2",
      environment: process.env.APP_ENV,
    };
    break;
  default:
    constants = {
      applicationPort: 5000,
      dynamoDbLocation: "http://localhost:8000",
      awsRegion: "local",
      environment: "development",
    };
}

export default constants;
