import { DynamoDB } from "aws-sdk";
import { String } from "aws-sdk/clients/appstream";
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
  id: String,
  tableName: DynamoTables
): Promise<void> => {
  try {
    await documentClient
      .delete({
        Key: {
          id: id,
        },
        TableName: tableName,
      })
      .promise();
    console.log(`Item ${id} deleted from the ${tableName} table.`);
  } catch (error) {
    throw error;
  }
};

export const putItem = async (
  item: DbType,
  tableName: DynamoTables
): Promise<void> => {
  try {
    await documentClient
      .put({
        Item: item,
        TableName: tableName,
      })
      .promise();
    console.log(`Item ${item.id} updated in the ${tableName} table.`);
  } catch (error) {
    throw error;
  }
};

export const getItem = async (
  id: String,
  tableName: DynamoTables
): Promise<any> => {
  try {
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
  } catch (error) {
    throw error;
  }
};

export const queryItemsByUser = async (
  userId: String,
  tableName: DynamoTables
): Promise<any> => {
  try {
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
  } catch (error) {
    throw error;
  }
};

export const createDynamoTable = async (
  tableName: DynamoTables
): Promise<void> => {
  try {
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
  } catch (error) {
    throw error;
  }
};

export const deleteDynamoTable = async (
  tableName: DynamoTables
): Promise<void> => {
  try {
    await dynamoClient.deleteTable({ TableName: tableName }).promise();
    console.log(`Dynamo table ${tableName} deleted successfully.`);
  } catch (error) {
    throw error;
  }
};
