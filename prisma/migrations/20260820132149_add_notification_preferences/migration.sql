-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notifyEmail" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notifyEstimate" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notifyMarket" BOOLEAN NOT NULL DEFAULT false;
