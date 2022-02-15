import { DynamoDB } from "aws-sdk";
import { DynamoTables } from "../../types/dynamoTables";
const tableName: DynamoTables = "brew-settings";

export const brewSettingsTable: DynamoDB.CreateTableInput = {
  TableName: tableName,
  KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
  BillingMode: "PAY_PER_REQUEST",
};
