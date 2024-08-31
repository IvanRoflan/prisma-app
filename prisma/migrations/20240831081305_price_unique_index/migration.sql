/*
  Warnings:

  - A unique constraint covering the columns `[productId,storeId,currency]` on the table `prices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "prices_productId_storeId_currency_key" ON "prices"("productId", "storeId", "currency");
