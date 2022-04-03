import { DynamoDB } from "aws-sdk";
import { DynamoTables } from "../../types/dynamo-tables";

const tableName: DynamoTables = "recipes";

export const recipeTableConfig: DynamoDB.CreateTableInput = {
  TableName: tableName,
  KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
    { AttributeName: "user", AttributeType: "S" },
  ],
  BillingMode: "PAY_PER_REQUEST",
  GlobalSecondaryIndexes: [
    {
      IndexName: "userIndex",
      KeySchema: [{ AttributeName: "user", KeyType: "HASH" }],
      Projection: {
        ProjectionType: "ALL",
      },
    },
  ],
};
