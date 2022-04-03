import { createDynamoTable } from "../utilities/dynamo-helpers";
import { recipeTableConfig } from "./dynamo-config/recipes";
import { usersTableConfig } from "./dynamo-config/user";

const buildDynamoTables = async () => {
  await createDynamoTable("recipes", recipeTableConfig);
  await createDynamoTable("users", usersTableConfig);
};

buildDynamoTables();
