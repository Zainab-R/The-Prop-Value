/*
  Warnings:

  - You are about to drop the column `block` on the `Estimate` table. All the data in the column will be lost.
  - You are about to drop the column `plotNumber` on the `Estimate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Estimate" DROP COLUMN "block",
DROP COLUMN "plotNumber";
