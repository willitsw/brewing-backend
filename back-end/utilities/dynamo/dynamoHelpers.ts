import { DynamoDB } from "aws-sdk";
import { DbType } from "../../../types/beerInterfaces";
import { DynamoTables } from "../../../types/dynamoTables";
import { constants } from "../../constants";

const dynamoClient = new DynamoDB({
  apiVersion: "2012-08-10",
  endpoint: constants.dynamoDbLocation,
  region: constants.awsRegion,
});

const documentClient = new DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  endpoint: constants.dynamoDbLocation,
  region: constants.awsRegion,
});

export const deleteItem = async (
  id: string,
  tableName: DynamoTables
): Promise<void> => {
  await documentClient
    .delete({
      Key: {
        id: id,
      },
      TableName: tableName,
    })
    .promise();
  console.log(`Item ${id} deleted from the ${tableName} table.`);
};

export const putItem = async (
  item: DbType,
  tableName: DynamoTables
): Promise<void> => {
  await documentClient
    .put({
      Item: item,
      TableName: tableName,
    })
    .promise();
  console.log(`Item ${item.id} updated in the ${tableName} table.`);
};

export const getItem = async (
  id: string,
  tableName: DynamoTables
): Promise<DynamoDB.DocumentClient.AttributeMap> => {
  const item = await documentClient
    .get({
      TableName: tableName,
      Key: {
        id: id,
      },
    })
    .promise();
  console.log(`Item ${id} retrieved from the ${tableName} table.`);
  return item.Item;
};

export const queryItemsByUser = async (
  userId: string,
  tableName: DynamoTables
): Promise<DynamoDB.DocumentClient.ItemList> => {
  const result = await documentClient
    .query({
      TableName: tableName,
      IndexName: "userIndex",
      KeyConditionExpression: "#user = :userFromQuery",
      ExpressionAttributeNames: { "#user": "user" },
      ExpressionAttributeValues: { ":userFromQuery": userId },
    })
    .promise();
  console.log(`Items for ${userId} retrieved from the ${tableName} table.`);
  return result.Items;
};

export const createDynamoTable = async (
  tableName: DynamoTables
): Promise<void> => {
  await dynamoClient
    .createTable({
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
    })
    .promise();
  console.log(`Dynamo table ${tableName} created successfully.`);
};

export const deleteDynamoTable = async (
  tableName: DynamoTables
): Promise<void> => {
  await dynamoClient.deleteTable({ TableName: tableName }).promise();
  console.log(`Dynamo table ${tableName} deleted successfully.`);
};
