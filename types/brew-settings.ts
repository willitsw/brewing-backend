import { DbType } from "./beerInterfaces";

export interface BrewSettings extends DbType {
  author: string;
  measurementType: "imperial" | "metric";
  batchSize: number;
  boilTime: number;
  brewhouseEfficiency: number;
  waterLossPerGrain: number;
  fermentorTrubWaterLoss: number;
  kettleTrubWaterLoss: number;
  boilOffWaterLossRate: number;
}
