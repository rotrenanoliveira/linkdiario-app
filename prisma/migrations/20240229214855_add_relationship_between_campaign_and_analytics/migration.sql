/*
  Warnings:

  - Added the required column `campaign_id` to the `campaign-analytics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "campaign-analytics" ADD COLUMN     "campaign_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "campaign-analytics" ADD CONSTRAINT "campaign-analytics_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
