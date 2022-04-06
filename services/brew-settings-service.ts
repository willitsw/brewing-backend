import { BrewingTypes as BT } from "brewing-shared";
import { FirebaseUser } from "../types/firebase-user";
import { putItem, getItem } from "../utilities/dynamo-helpers";
import { putRecipe } from "./recipe-service";
import { getJunesMama } from "../data/recipes";
import constants from "../constants";

export const putUser = async (user: BT.User): Promise<void> => {
  await putItem(user, `users-${constants.environment}`);
};

export const getUserById = async (
  firebaseUser: FirebaseUser
): Promise<BT.User> => {
  const user = (await getItem(firebaseUser.userId, "users", "id")) as BT.User;

  if (!user) {
    console.log(
      `User ${firebaseUser.displayName} ${firebaseUser.userId} not found. Creating new entity...`
    );
    const newUser: BT.User = {
      batchSize: 5,
      boilOffWaterLossRate: 1.5,
      boilTime: 60,
      brewhouseEfficiency: 70,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      fermentorTrubWaterLoss: 0.25,
      kettleTrubWaterLoss: 0.25,
      measurementType: "imperial",
      id: firebaseUser.userId,
      waterLossPerGrain: 0.5,
      sparge: false,
      mashThickness: 1.3,
    };
    await putUser(newUser);

    const firstRecipe = getJunesMama();
    firstRecipe.userId = firebaseUser.userId;
    await putRecipe(firstRecipe);

    return newUser;
  }

  return user;
};
