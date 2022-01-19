const isLocal = process.env.environment !== "production";

interface Constants {
  applicationPort: number;
  dynamoDbLocation: string;
  awsRegion: string;
  isLocal: boolean;
}

export const constants: Constants = {
  applicationPort: 5000,
  dynamoDbLocation: isLocal
    ? "http://localhost:8000"
    : "https://dynamodb.us-east-2.amazonaws.com",
  awsRegion: isLocal ? "local" : "us-east-2",
  isLocal: isLocal,
};
