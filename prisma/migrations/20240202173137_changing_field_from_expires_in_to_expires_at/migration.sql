/*
  Warnings:

  - You are about to drop the column `expires_in` on the `access_code` table. All the data in the column will be lost.
  - Added the required column `expires_at` to the `access_code` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "access_code" DROP COLUMN "expires_in",
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL;
