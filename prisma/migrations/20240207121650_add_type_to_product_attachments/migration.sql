/*
  Warnings:

  - Added the required column `type` to the `ProductAttachments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PRODUCT_ATTACHMENT_TYPE" AS ENUM ('CARD', 'CAROUSEL');

-- AlterTable
ALTER TABLE "ProductAttachments" ADD COLUMN     "type" "PRODUCT_ATTACHMENT_TYPE" NOT NULL;
