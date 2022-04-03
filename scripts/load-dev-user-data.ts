import { PrismaClient } from "@prisma/client";
import { getJunesMamaIpa } from "../data/recipes";
import { putRecipe } from "../services/recipe-service";

const prisma = new PrismaClient();

const devId = "123456789";

const devUser = {
  batchSize: 5,
  boilOffWaterLossRate: 1.5,
  boilTime: 60,
  brewhouseEfficiency: 70,
  displayName: "DEVUSER",
  email: "DEVUSER@DEVUSER.DEVUSER",
  fermentorTrubWaterLoss: 0.25,
  kettleTrubWaterLoss: 0.25,
  measurementType: "imperial",
  id: devId,
  waterLossPerGrain: 0.5,
  sparge: false,
  mashThickness: 1.3,
};

const junesMama = getJunesMamaIpa();

prisma.user
  .create({
    data: devUser,
  })
  .then(() => putRecipe(junesMama, devId));
