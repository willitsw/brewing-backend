import { BrewSettings } from "../types/brew-settings";
import { putItem, getItem, deleteItem } from "../utilities/dynamo-helpers";

export const putBrewSetting = async (
  brewSetting: BrewSettings
): Promise<void> => {
  await putItem(brewSetting, "brew-settings");
};

export const getBrewSettingById = async (id: string): Promise<BrewSettings> => {
  return (await getItem(id, "brew-settings")) as BrewSettings;
};

export const deleteBrewSetting = async (id: string): Promise<void> => {
  return await deleteItem(id, "brew-settings");
};
