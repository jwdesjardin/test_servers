/*
  Warnings:

  - You are about to drop the `Recommendation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recommendation" DROP CONSTRAINT "Recommendation_recommendedId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productId" INTEGER;

-- DropTable
DROP TABLE "Recommendation";

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
