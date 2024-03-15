/*
  Warnings:

  - A unique constraint covering the columns `[campaign_id]` on the table `campaign-analytics-initial` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "campaign-analytics-initial_campaign_id_key" ON "campaign-analytics-initial"("campaign_id");
