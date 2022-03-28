import { BrewingTypes as BT } from "brewing-shared";
import { FirebaseUser } from "../types/firebase-user";
import { putItem, getItem, deleteItem } from "../utilities/dynamo-helpers";
import { recipeSeedData } from "../scripts/dynamo-data/recipes";
import { putRecipe } from "./recipe-service";

export const putBrewSetting = async (
  brewSetting: BT.BrewSettings
): Promise<void> => {
  await putItem(brewSetting, "brew-settings");
};

export const getBrewSettingById = async (
  user: FirebaseUser
): Promise<BT.BrewSettings> => {
  const brewSettings = (await getItem(
    user.userId,
    "brew-settings",
    "userId"
  )) as BT.BrewSettings;

  if (!brewSettings) {
    console.log(
      `Settings for user ${user.displayName} ${user.userId} not found. Creating new settings...`
    );
    const newBrewSettings: BT.BrewSettings = {
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

    const firstRecipe = recipeSeedData[0];
    firstRecipe.user = user.userId;
    await putRecipe(firstRecipe);

    return newBrewSettings;
  }

  return brewSettings;
};

export const deleteBrewSetting = async (id: string): Promise<void> => {
  return await deleteItem(id, "brew-settings", "userId");
};
