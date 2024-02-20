/*
  Warnings:

  - You are about to drop the column `product_id` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the `ProductAttachments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `slug` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `campaigns` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CAMPAIGN_TYPE" AS ENUM ('PRESELL', 'QUIZ');

-- DropForeignKey
ALTER TABLE "ProductAttachments" DROP CONSTRAINT "ProductAttachments_product_id_fkey";

-- DropForeignKey
ALTER TABLE "campaigns" DROP CONSTRAINT "campaigns_product_id_fkey";

-- DropIndex
DROP INDEX "campaigns_product_id_key";

-- AlterTable
ALTER TABLE "campaigns" DROP COLUMN "product_id",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "quiz" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "subtitle" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" "CAMPAIGN_TYPE" NOT NULL;

-- DropTable
DROP TABLE "ProductAttachments";

-- DropTable
DROP TABLE "products";

-- DropEnum
DROP TYPE "PRODUCT_ATTACHMENT_TYPE";

-- CreateTable
CREATE TABLE "campaign_attachments" (
    "id" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "campaign_attachments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "campaign_attachments" ADD CONSTRAINT "campaign_attachments_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
