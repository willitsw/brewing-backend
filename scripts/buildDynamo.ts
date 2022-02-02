import { createDynamoTable, putItem } from "../utilities/dynamo/dynamoHelpers";
import { recipeSeedData } from "../seed-data/recipes";

const buildDynamoTables = async () => {
  await createDynamoTable("recipes");
  recipeSeedData.forEach(async (item) => {
    await putItem(item, "recipes");
  });
};

buildDynamoTables();
