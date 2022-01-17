require("dotenv").config();

const isLocal = process.env.NODE_ENV === "development";

interface Constants {
  applicationPort: number;
  dynamoDbLocation: string;
  awsRegion: string;
  isLocal: boolean;
}

export const constants: Constants = {
  applicationPort: 5000,
  dynamoDbLocation: "http://localhost:8000",
  awsRegion: "local",
  isLocal: isLocal,
};
