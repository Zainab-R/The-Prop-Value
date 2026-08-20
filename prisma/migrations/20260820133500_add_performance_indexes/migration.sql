-- CreateIndex
CREATE INDEX "Estimate_userId_idx" ON "Estimate"("userId");

-- CreateIndex
CREATE INDEX "Estimate_createdAt_idx" ON "Estimate"("createdAt");

-- CreateIndex
CREATE INDEX "MarketRate_propertyType_propertySize_sector_idx" ON "MarketRate"("propertyType", "propertySize", "sector");
