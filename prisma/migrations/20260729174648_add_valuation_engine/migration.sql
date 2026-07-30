-- CreateTable
CREATE TABLE "LuxuryRate" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LuxuryRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmenityRate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "AmenityRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadRate" (
    "id" TEXT NOT NULL,
    "roadType" TEXT NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RoadRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LuxuryRate_level_key" ON "LuxuryRate"("level");

-- CreateIndex
CREATE UNIQUE INDEX "AmenityRate_name_key" ON "AmenityRate"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RoadRate_roadType_key" ON "RoadRate"("roadType");
