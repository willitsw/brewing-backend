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
    efficiency: {
      brewhouse: {
        value: 60,
        unit: "%",
      },
    },
    user: "bob",
    ingredients: {
      hop_additions: [
        {
          name: "Calypso",
          alpha_acid: {
            unit: "%",
            value: 11,
          },
          amount: {
            value: 1,
            unit: "oz",
          },
          timing: {
            use: "add_to_boil",
            time: {
              value: 4,
              unit: "min",
            },
          },
        },
        {
          name: "Fuggle",
          alpha_acid: {
            unit: "%",
            value: 12,
          },
          amount: {
            value: 2,
            unit: "oz",
          },
          timing: {
            use: "add_to_fermentation",
            time: {
              value: 69,
              unit: "min",
            },
          },
        },
        {
          name: "Summit",
          alpha_acid: {
            unit: "%",
            value: 17.5,
          },
          amount: {
            unit: "oz",
            value: 1,
          },
          timing: {
            use: "add_to_boil",
            time: {
              value: 22,
              unit: "min",
            },
          },
        },
      ],
      fermentable_additions: [
        {
          name: "Pilsner (Weyermann)",
          amount: {
            value: 5,
            unit: "lb",
          },
          color: {
            value: 2,
            unit: "Lovi",
          },
          type: "grain",
          yield: {
            potential: {
              value: 1.038,
              unit: "sg",
            },
          },
        },
        {
          name: "Pale Malt Maris Otter",
          amount: {
            value: 5,
            unit: "lb",
          },
          color: {
            value: 4,
            unit: "Lovi",
          },
          type: "grain",
          yield: {
            potential: {
              value: 1.038,
              unit: "sg",
            },
          },
        },
        {
          name: "Munich Malt",
          amount: {
            value: 4,
            unit: "lb",
          },
          color: {
            value: 6,
            unit: "Lovi",
          },
          type: "grain",
          yield: {
            potential: {
              value: null,
              unit: "sg",
            },
          },
        },
        {
          name: "Acid Malt",
          amount: {
            value: 0.5,
            unit: "lb",
          },
          color: {
            value: 3,
            unit: "Lovi",
          },
          type: "grain",
          yield: {
            potential: {
              value: 1.027,
              unit: "sg",
            },
          },
        },
      ],
    },
    id: "3",
    name: "Maibock 2021",
    batch_size: {
      value: 4.5,
      unit: "gal",
    },
    author: "Bill",
    type: "all grain",
  },
];
