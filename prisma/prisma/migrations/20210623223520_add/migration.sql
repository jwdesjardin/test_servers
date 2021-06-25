/*
  Warnings:

  - You are about to drop the column `image` on the `Recommendation` table. All the data in the column will be lost.
  - Added the required column `imageDesktop` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageMobile` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageTablet` to the `Recommendation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recommendation" DROP COLUMN "image",
ADD COLUMN     "imageDesktop" VARCHAR(255) NOT NULL,
ADD COLUMN     "imageMobile" VARCHAR(255) NOT NULL,
ADD COLUMN     "imageTablet" VARCHAR(255) NOT NULL;
