interface Constants {
  readonly applicationPort: number;
  readonly dynamoDbLocation: string;
  readonly awsRegion: string;
  readonly isLocal: boolean;
}

let constants: Constants;

switch (process.env.APP_ENV) {
  case "production":
    constants = {
      applicationPort: 5000,
      dynamoDbLocation: "https://dynamodb.us-east-2.amazonaws.com",
      awsRegion: "us-east-2",
      isLocal: false,
    };
    break;
  case "development":
    constants = {
      applicationPort: 5000,
      dynamoDbLocation: "http://localhost:8000",
      awsRegion: "local",
      isLocal: true,
    };
    break;
  default:
    throw Error(`Invalid environment supplied: ${process.env.APP_ENV}`);
}

export default constants;
