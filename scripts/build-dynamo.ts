import { createDynamoTable, putItem } from "../utilities/dynamo-helpers";
import { recipeSeedData, recipeTableConfig } from "./dynamo-data/recipes";
import { brewSettingsTableConfig } from "./dynamo-data/brew-settings";
import { usersTableConfig } from "./dynamo-data/users";

const buildDynamoTables = async () => {
  await createDynamoTable("recipes", recipeTableConfig);
  recipeSeedData.forEach(async (item) => {
    await putItem(item, "recipes");
  });
  await createDynamoTable("brew-settings", brewSettingsTableConfig);
  await createDynamoTable("users", usersTableConfig);
};

buildDynamoTables();
