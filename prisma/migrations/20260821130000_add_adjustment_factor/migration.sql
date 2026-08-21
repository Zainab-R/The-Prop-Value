-- CreateTable
CREATE TABLE "AdjustmentFactor" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdjustmentFactor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdjustmentFactor_key_key" ON "AdjustmentFactor"("key");

-- Seed rows matching the multipliers that were previously hardcoded
-- in lib/valuation.ts, so applying this migration does not change
-- any existing estimate's pricing behavior.
INSERT INTO "AdjustmentFactor" ("id", "key", "label", "multiplier", "updatedAt") VALUES
    (gen_random_uuid()::text, 'cornerPlot', 'Corner Plot', 1.07, CURRENT_TIMESTAMP),
    (gen_random_uuid()::text, 'parkFacing', 'Park Facing', 1.05, CURRENT_TIMESTAMP),
    (gen_random_uuid()::text, 'mainBoulevard', 'Main Boulevard', 1.08, CURRENT_TIMESTAMP),
    (gen_random_uuid()::text, 'readyToMove', 'Ready to Move', 1.15, CURRENT_TIMESTAMP);
