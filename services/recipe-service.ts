import { PrismaClient } from "@prisma/client";
import { BrewingTypes as BT } from "brewing-shared";

const prisma = new PrismaClient();

export const putRecipe = async (
  recipe: BT.Recipe,
  userId: string
): Promise<void> => {
  try {
    await prisma.recipe.upsert({
      where: { id: recipe.id },
      create: {
        ...recipe,
        ingredients: {
          create: recipe.ingredients,
        },
        user: {
          connect: { id: userId },
        },
      },
      update: {
        ...recipe,
        ingredients: {
          create: recipe.ingredients,
        },
      },
    });
  } catch (e) {
    throw Error(`put recipe failed: ${e}`);
  }
};

export const getRecipeById = async (
  recipeId: string,
  userId: string
): Promise<BT.Recipe> => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: { ingredients: true },
  });

  if (!recipe) {
    throw Error(`{Not Found}: ${recipeId} does not exist`);
  }

  if (recipe.userId !== userId) {
    throw Error(
      `{Unauthorized}: User ${userId} does not have access to recipe ${recipeId}`
    );
  }

  recipe.ingredients.forEach((ingredient) => {
    Object.keys(ingredient).forEach(
      (k) => ingredient[k] == null && delete ingredient[k]
    );
  });

  return recipe as BT.Recipe;
};

export const queryRecipesByUser = async (
  userId: string
): Promise<BT.Recipe[]> => {
  try {
    const recipes = await prisma.recipe.findMany({
      where: { userId: userId },
    });
    return recipes.map((recipe) => {
      return {
        ...recipe,
        ingredients: [],
      };
    }) as BT.Recipe[];
  } catch (e) {
    throw Error(`query recipes by user failed: ${e}`);
  }
};

export const deleteRecipe = async (
  recipeId: string,
  userId: string
): Promise<void> => {
  await getRecipeById(recipeId, userId); // if we can get it, we have access to delete it

  const ingredientDeletes = prisma.ingredient.deleteMany({
    where: {
      recipeId: recipeId,
    },
  });
  const recipeDeletes = prisma.recipe.delete({
    where: { id: recipeId },
  });

  try {
    await prisma
      .$transaction([ingredientDeletes, recipeDeletes])
      .catch((e) => console.dir(e));
  } catch (e) {
    throw Error(`delete recipe failed: ${e}`);
  }
};
