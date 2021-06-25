-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "cartName" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "cartImage" VARCHAR(255) NOT NULL,
    "galleryImageMobile1" VARCHAR(255) NOT NULL,
    "galleryImageMobile2" VARCHAR(255) NOT NULL,
    "galleryImageMobile3" VARCHAR(255) NOT NULL,
    "galleryImageTablet1" VARCHAR(255) NOT NULL,
    "galleryImageTablet2" VARCHAR(255) NOT NULL,
    "galleryImageTablet3" VARCHAR(255) NOT NULL,
    "galleryImageDesktop1" VARCHAR(255) NOT NULL,
    "galleryImageDesktop2" VARCHAR(255) NOT NULL,
    "galleryImageDesktop3" VARCHAR(255) NOT NULL,
    "mainImageMobile" VARCHAR(255) NOT NULL,
    "mainImageTablet" VARCHAR(255) NOT NULL,
    "mainImageDesktop" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "new" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncludedItem" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recommendedId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product.slug_unique" ON "Product"("slug");

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncludedItem" ADD FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD FOREIGN KEY ("recommendedId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
