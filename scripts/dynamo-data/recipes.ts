import { DynamoDB } from "aws-sdk";
import { Recipe } from "../../types/recipe";
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

export const recipeSeedData: Recipe[] = [
  {
    efficiency: 70,
    batchSize: 5,
    author: "Jon Diddly",
    name: "Pale Ale",
    description: "A classic IPA",
    hops: [
      {
        name: "Centennial",
        alphaAcid: 10.5,
        amount: 2,
        timing: 60,
        use: "Boil",
      },
      {
        name: "Cascade",
        alphaAcid: 6,
        amount: 2,
        timing: 30,
        use: "Boil",
      },
      {
        name: "Centennial",
        alphaAcid: 10.5,
        amount: 2,
        timing: 0,
        use: "Flame out",
      },
    ],
    fermentables: [
      {
        name: "Pale Ale Malt",
        amount: 12,
        lovibond: 3,
        type: "Grain",
        gravity: 1.036,
      },
      {
        name: "Caramel/Crystal Malt - 15L",
        amount: 1,
        lovibond: 15,
        type: "Grain",
        gravity: 1.035,
      },
    ],
    cultures: [
      {
        name: "US-05",
        attenuation: 77,
        form: "Liquid",
        type: "Ale",
      },
    ],
    id: "9673094b-799f-483f-bf20-9455063233d7",
    type: "All grain",
    user: "123456789",
    measurementType: "imperial",
  },
];
