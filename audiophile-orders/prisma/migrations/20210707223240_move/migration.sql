/*
  Warnings:

  - You are about to drop the column `userID` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomerInfo" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "userID",
ALTER COLUMN "emoneyNumber" DROP NOT NULL,
ALTER COLUMN "emoneyPin" DROP NOT NULL;
