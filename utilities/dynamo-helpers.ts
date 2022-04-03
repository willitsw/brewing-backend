import { DynamoDB } from "aws-sdk";
import { DynamoTables } from "../types/dynamo-tables";
import { constants } from "../constants";

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
  tableName: DynamoTables,
  key: string
): Promise<void> => {
  await documentClient
    .delete({
      Key: {
        [key]: id,
      },
      TableName: tableName,
    })
    .promise();
  console.log(`Item ${id} deleted from the ${tableName} table.`);
};

export const putItem = async (
  item: any,
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
  pk: string,
  tableName: DynamoTables,
  key: string
): Promise<DynamoDB.DocumentClient.AttributeMap> => {
  const item = await documentClient
    .get({
      TableName: tableName,
      Key: {
        [key]: pk,
      },
    })
    .promise();
  const result = item.Item;
  if (result) {
    console.log(`Item ${pk} retrieved from the ${tableName} table.`);
  } else {
    console.log(`Item ${pk} not found in the ${tableName} table.`);
  }
  return result;
};

export const queryItemsByUser = async (
  userId: string,
  tableName: DynamoTables
): Promise<DynamoDB.DocumentClient.ItemList> => {
  const result = await documentClient
    .query({
      TableName: tableName,
      IndexName: "userIndex",
      KeyConditionExpression: "#userId = :userFromQuery",
      ExpressionAttributeNames: { "#userId": "userId" },
      ExpressionAttributeValues: { ":userFromQuery": userId },
    })
    .promise();
  if (result) {
    console.log(`Items for ${userId} retrieved from the ${tableName} table.`);
  } else {
    console.log(`Items for ${userId} not found in the ${tableName} table.`);
  }
  return result.Items;
};

export const createDynamoTable = async (
  tableName: DynamoTables,
  tableConfig: DynamoDB.CreateTableInput
): Promise<void> => {
  await dynamoClient.createTable(tableConfig).promise();
  console.log(`Dynamo table ${tableName} created successfully.`);
};

export const deleteDynamoTable = async (
  tableName: DynamoTables
): Promise<void> => {
  await dynamoClient.deleteTable({ TableName: tableName }).promise();
  console.log(`Dynamo table ${tableName} deleted successfully.`);
};
