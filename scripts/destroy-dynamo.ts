import { deleteDynamoTable } from "../utilities/dynamo-helpers";

deleteDynamoTable("recipes");
deleteDynamoTable("brew-settings");
deleteDynamoTable("users");
