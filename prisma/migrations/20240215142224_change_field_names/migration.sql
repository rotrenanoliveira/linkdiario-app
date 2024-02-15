/*
  Warnings:

  - You are about to drop the column `file` on the `campaign_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `campaign_attachments` table. All the data in the column will be lost.
  - Added the required column `key` to the `campaign_attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `campaign_attachments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "campaign_attachments" DROP COLUMN "file",
DROP COLUMN "url",
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
