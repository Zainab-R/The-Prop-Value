-- CreateTable
CREATE TABLE "MarketRate" (
    "id" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "propertySize" TEXT NOT NULL,
    "basePrice" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketRate_pkey" PRIMARY KEY ("id")
);
