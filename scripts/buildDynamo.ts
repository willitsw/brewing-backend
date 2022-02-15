import { createDynamoTable, putItem } from "../utilities/dynamo-helpers";
import { recipeSeedData, recipeTable } from "./dynamo-data/recipes";
import { brewSettingsTable } from "./dynamo-data/brew-settings";

const buildDynamoTables = async () => {
  await createDynamoTable("recipes", recipeTable);
  recipeSeedData.forEach(async (item) => {
    await putItem(item, "recipes");
  });
  await createDynamoTable("brew-settings", brewSettingsTable);
};

buildDynamoTables();
