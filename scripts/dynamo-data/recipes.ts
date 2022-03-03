import { DynamoDB } from "aws-sdk";
import { Recipe, Step } from "../../types/recipe";
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
    efficiency: 60,
    author: "Bill W.",
    description:
      "This one is a house favorite. A white IPA with orange zest and coriander added at flameout. Based on your own efficiency/volume, tweak the grain bill and bittering hops to hit an OG of low 1.060's and IBUs in the low 60's.",
    nonFermentables: [
      {
        name: "Orange zest",
        amount: "2 oranges",
        notes: "Microplane or chop finely, add to wort at flameout",
        step: Step.Boil,
        timing: 0,
      },
      {
        name: "Coriander, ground",
        amount: "5 tsp",
        notes: "Add to wort at flamout",
        step: Step.Boil,
        timing: 0,
      },
      {
        name: "Gypsum",
        amount: "10.5 g",
        notes: "Add to strike water",
        step: Step.StrikeWater,
        timing: 0,
      },
    ],
    type: "All grain",
    cultures: [
      {
        name: "Wyeast 3787",
        attenuation: 78,
        notes: "Do a starter if you have time.",
        form: "Liquid",
        step: Step.Fermentor,
        timing: 0,
      },
    ],
    name: "June's Mama IPA",
    measurementType: "imperial",
    hops: [
      {
        name: "Magnum",
        amount: 1.5,
        timing: 60,
        alphaAcid: 12,
        step: Step.Boil,
        notes: "",
      },
      {
        name: "Citra",
        amount: 2,
        timing: 7,
        alphaAcid: 12,
        step: Step.Fermentor,
        notes: "",
      },
      {
        name: "Centennial",
        amount: 1,
        timing: 7,
        alphaAcid: 10.5,
        step: Step.Fermentor,
        notes: "",
      },
      {
        name: "Cascade",
        amount: 1,
        timing: 7,
        alphaAcid: 6,
        step: Step.Fermentor,
        notes: "",
      },
    ],
    id: "9673094b-799f-483f-bf20-9455063233d7",
    batchSize: 4.5,
    fermentables: [
      {
        name: "Pilsner (Weyermann)",
        amount: 7,
        type: "Grain",
        lovibond: 1,
        gravity: 1.038,
        notes: "",
        step: Step.Mash,
        timing: 60,
      },
      {
        name: "Wheat",
        amount: 3,
        type: "Grain",
        lovibond: 1,
        gravity: 1.038,
        notes: "",
        step: Step.Mash,
        timing: 60,
      },
      {
        name: "Wheat Flaked",
        amount: 2,
        type: "Grain",
        lovibond: 2,
        gravity: 1.035,
        notes: "",
        step: Step.Mash,
        timing: 60,
      },
      {
        name: "Acid Malt",
        amount: 0.5,
        type: "Grain",
        lovibond: 3,
        gravity: 1.027,
        notes: "",
        step: Step.Mash,
        timing: 60,
      },
    ],
    user: "123456789",
  },
];
