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
    efficiency: {
      brewhouse: {
        value: 70,
        unit: "%",
      },
    },
    batch_size: {
      value: 5,
      unit: "gal",
    },
    author: "Jon Diddly",
    name: "Pale Ale",
    description: "A classic IPA",
    ingredients: {
      hop_additions: [
        {
          name: "Centennial",
          alpha_acid: {
            value: 10.5,
            unit: "%",
          },
          amount: {
            value: 2,
            unit: "oz",
          },
          timing: {
            use: "add_to_boil",
            time: {
              value: 60,
              unit: "min",
            },
          },
        },
        {
          name: "Cascade",
          alpha_acid: {
            value: 6,
            unit: "%",
          },
          amount: {
            value: 2,
            unit: "oz",
          },
          timing: {
            use: "add_to_boil",
            time: {
              value: 30,
              unit: "min",
            },
          },
        },
        {
          name: "Centennial",
          alpha_acid: {
            value: 10.5,
            unit: "%",
          },
          amount: {
            value: 2,
            unit: "oz",
          },
          timing: {
            use: "add_to_fermentation",
            time: {
              value: 0,
              unit: "min",
            },
          },
        },
      ],
      fermentable_additions: [
        {
          name: "Pale Ale Malt",
          amount: {
            value: 12,
            unit: "lb",
          },
          color: {
            value: 3,
            unit: "Lovi",
          },
          type: "grain",
          yield: {
            potential: {
              value: 1.036,
              unit: "sg",
            },
          },
        },
        {
          name: "Caramel/Crystal Malt - 15L",
          amount: {
            value: 1,
            unit: "lb",
          },
          color: {
            value: 15,
            unit: "Lovi",
          },
          type: "grain",
          yield: {
            potential: {
              value: 1.035,
              unit: "sg",
            },
          },
        },
      ],
      culture_additions: [
        {
          name: "US-05",
          attenuation: {
            value: 77,
            unit: "%",
          },
          form: "liquid",
          type: "ale",
        },
      ],
    },
    id: "9673094b-799f-483f-bf20-9455063233d7",
    type: "all grain",
    user: "123456789",
  },
];
