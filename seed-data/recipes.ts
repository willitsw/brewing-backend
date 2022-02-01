import { DynamoDB } from "aws-sdk";
import { Recipe } from "../types/beerInterfaces";
import { DynamoTables } from "../types/dynamoTables";
const tableName: DynamoTables = "recipes";

export const recipeTable: DynamoDB.CreateTableInput = {
  TableName: tableName,
  KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
  BillingMode: "PAY_PER_REQUEST",
};

export const recipeSeedData: Recipe[] = [
  {
    id: "1",
    user: "bob",
    name: "Pale Ale 1",
    type: "all grain",
    author: "Jack Flash",
    batch_size: {
      unit: "gal",
      value: 5,
    },
    efficiency: {
      brewhouse: {
        unit: "%",
        value: 55,
      },
    },
    ingredients: {
      fermentable_additions: [
        {
          amount: {
            unit: "lb",
            value: 5,
          },
          color: {
            unit: "SRM",
            value: 2,
          },
          name: "Pilsner Malt",
          type: "grain",
          yield: {},
        },
      ],
    },
  },
  {
    id: "2",
    user: "bob",
    name: "Dunkel Lager",
    type: "extract",
    author: "Jack Flash",
    batch_size: {
      unit: "gal",
      value: 3,
    },
    efficiency: {
      brewhouse: {
        unit: "%",
        value: 60,
      },
    },
    ingredients: {
      fermentable_additions: [
        {
          amount: {
            unit: "lb",
            value: 7,
          },
          color: {
            unit: "SRM",
            value: 40,
          },
          name: "Caramel 40L",
          type: "grain",
          yield: {},
        },
        {
          amount: {
            unit: "lb",
            value: 7,
          },
          color: {
            unit: "SRM",
            value: 2,
          },
          name: "Pale Malt",
          type: "grain",
          yield: {},
        },
      ],
    },
  },
];
