import { BrewingTypes as BT } from "brewing-shared";
import {
  putItem,
  getItem,
  queryItemsByUser,
  deleteItem,
} from "../utilities/dynamo-helpers";
import constants from "../constants";

export const putBrewLog = async (brewLog: BT.BrewLog): Promise<void> => {
  await putItem(brewLog, `brew-log-${constants.environment}`);
};

export const getBrewLogById = async (id: string): Promise<BT.BrewLog> => {
  return (await getItem(
    id,
    `brew-log-${constants.environment}`,
    "id"
  )) as BT.BrewLog;
};

export const queryBrewLogsByUser = async (
  userId: string
): Promise<BT.BrewLog[]> => {
  return (await queryItemsByUser(
    userId,
    `brew-log-${constants.environment}`
  )) as BT.BrewLog[];
};

export const deleteBrewLog = async (id: string): Promise<void> => {
  return await deleteItem(id, `brew-log-${constants.environment}`, "id");
};
