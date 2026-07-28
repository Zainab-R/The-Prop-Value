/*
  Warnings:

  - Added the required column `updatedAt` to the `Estimate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estimate" ADD COLUMN     "cornerPlot" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mainBoulevard" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parkFacing" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "plotNumber" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
