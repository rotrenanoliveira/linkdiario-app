/*
  Warnings:

  - You are about to drop the column `company_id` on the `licenses` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `licenses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "licenses" DROP CONSTRAINT "licenses_company_id_fkey";

-- AlterTable
ALTER TABLE "licenses" DROP COLUMN "company_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "licenses" ADD CONSTRAINT "licenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
