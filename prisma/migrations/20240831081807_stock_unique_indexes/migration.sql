/*
  Warnings:

  - A unique constraint covering the columns `[productId,storeId]` on the table `store_stocks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `warehouse_stocks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "store_stocks_productId_storeId_key" ON "store_stocks"("productId", "storeId");

-- CreateIndex
CREATE UNIQUE INDEX "warehouse_stocks_productId_key" ON "warehouse_stocks"("productId");
