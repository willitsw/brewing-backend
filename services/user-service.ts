import { BrewingTypes as BT } from "brewing-shared";
import { FirebaseUser } from "../types/firebase-user";
import { putRecipe } from "./recipe-service";
import { getDefaultUser } from "../data/user";
import { getJunesMamaIpa } from "../data/recipes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const patchUser = async (
  user: BT.User,
  userId: string
): Promise<void> => {
  if (user.id !== userId) {
    throw Error(
      `{Unauthorized}: User ${userId} does not have acccess to patch user ${user.id}`
    );
  }
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  } catch (e) {
    throw Error(`patch user failed: ${e}`);
  }
};

export const getUserById = async (
  firebaseUser: FirebaseUser
): Promise<BT.User> => {
  let user: BT.User;
  try {
    user = (await prisma.user.findUnique({
      where: { id: firebaseUser.userId },
    })) as BT.User;
  } catch (e) {
    throw Error(`get user failed: ${e}`);
  }

  if (!user) {
    console.log(
      `Settings for user ${firebaseUser.displayName} ${firebaseUser.userId} not found. Creating new settings...`
    );
    try {
      user = getDefaultUser(firebaseUser.userId);
      user.displayName = firebaseUser.displayName;
      user.email = firebaseUser.email;

      await prisma.user.create({
        data: user,
      });

      await putRecipe(getJunesMamaIpa(), firebaseUser.userId);
    } catch (e) {
      throw Error(`create new user failed: ${e}`);
    }
  }

  return user;
};
