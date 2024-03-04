/*
  Warnings:

  - You are about to drop the `campaign-analytics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "campaign-analytics" DROP CONSTRAINT "campaign-analytics_campaign_id_fkey";

-- DropTable
DROP TABLE "campaign-analytics";

-- CreateTable
CREATE TABLE "campaign-analytics-initial" (
    "id" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "page_view" INTEGER NOT NULL,
    "click_cta" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "campaign-analytics-initial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "campaign-analytics-initial" ADD CONSTRAINT "campaign-analytics-initial_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
