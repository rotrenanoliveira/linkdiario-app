-- AlterEnum
ALTER TYPE "CAMPAIGN_TYPE" ADD VALUE 'LEADS';

-- AlterTable
ALTER TABLE "campaigns" ADD COLUMN     "leads" TEXT;
