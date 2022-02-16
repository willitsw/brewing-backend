import { DynamoDB } from "aws-sdk";
import { DynamoTables } from "../../types/dynamo-tables";
const tableName: DynamoTables = "brew-settings";

export const brewSettingsTableConfig: DynamoDB.CreateTableInput = {
  TableName: tableName,
  KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "userId", AttributeType: "S" }],
  BillingMode: "PAY_PER_REQUEST",
};
