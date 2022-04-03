-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "measurementType" TEXT NOT NULL,
    "batchSize" DOUBLE PRECISION NOT NULL,
    "efficiency" INTEGER NOT NULL,
    "ingredients" JSONB NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "measurementType" TEXT NOT NULL,
    "batchSize" DOUBLE PRECISION NOT NULL,
    "boilTime" INTEGER NOT NULL,
    "brewhouseEfficiency" INTEGER NOT NULL,
    "waterLossPerGrain" DOUBLE PRECISION NOT NULL,
    "fermentorTrubWaterLoss" DOUBLE PRECISION NOT NULL,
    "kettleTrubWaterLoss" DOUBLE PRECISION NOT NULL,
    "boilOffWaterLossRate" DOUBLE PRECISION NOT NULL,
    "sparge" BOOLEAN NOT NULL,
    "mashThickness" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
