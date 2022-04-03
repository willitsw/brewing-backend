import { BrewingTypes as BT } from "brewing-shared";
import { v4 as uuid } from "uuid";

export const getDefaultUser = (id: string = uuid()): BT.User => {
  return {
    batchSize: 5,
    boilOffWaterLossRate: 1.5,
    boilTime: 60,
    brewhouseEfficiency: 70,
    displayName: "DEVUSER",
    email: "DEVUSER@DEVUSER.DEVUSER",
    fermentorTrubWaterLoss: 0.25,
    kettleTrubWaterLoss: 0.25,
    measurementType: "imperial",
    id,
    waterLossPerGrain: 0.5,
    sparge: false,
    mashThickness: 1.3,
  };
};
