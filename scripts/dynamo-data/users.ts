import { DynamoDB } from "aws-sdk";
import { DynamoTables } from "../../types/dynamo-tables";
const tableName: DynamoTables = "users";

export const usersTableConfig: DynamoDB.CreateTableInput = {
  TableName: tableName,
  KeySchema: [{ AttributeName: "firebaseId", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "firebaseId", AttributeType: "S" }],
  BillingMode: "PAY_PER_REQUEST",
};
