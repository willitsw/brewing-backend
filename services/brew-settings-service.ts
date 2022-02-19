import { BrewSettings } from "../types/brew-settings";
import { FirebaseUser } from "../types/firebase-user";
import { putItem, getItem, deleteItem } from "../utilities/dynamo-helpers";

export const putBrewSetting = async (
  brewSetting: BrewSettings
): Promise<void> => {
  await putItem(brewSetting, "brew-settings");
};

export const getBrewSettingById = async (
  user: FirebaseUser
): Promise<BrewSettings> => {
  const brewSettings = (await getItem(
    user.userId,
    "brew-settings",
    "userId"
  )) as BrewSettings;

  if (!brewSettings) {
    console.log(
      `Settings for user ${user.displayName} ${user.userId} not found. Creating new settings...`
    );
    const newBrewSettings: BrewSettings = {
      author: user.displayName,
      batchSize: 5,
      boilOffWaterLossRate: 1.5,
      boilTime: 60,
      brewhouseEfficiency: 70,
      displayName: user.displayName,
      email: user.email,
      fermentorTrubWaterLoss: 0.25,
      kettleTrubWaterLoss: 0.25,
      measurementType: "imperial",
      userId: user.userId,
      waterLossPerGrain: 0.5,
      sparge: false,
      mashThickness: 1.3,
    };
    await putBrewSetting(newBrewSettings);
    return newBrewSettings;
  }

  return brewSettings;
};

export const deleteBrewSetting = async (id: string): Promise<void> => {
  return await deleteItem(id, "brew-settings", "userId");
};
