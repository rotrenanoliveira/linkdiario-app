-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "leads" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
