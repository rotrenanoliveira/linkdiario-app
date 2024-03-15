-- CreateEnum
CREATE TYPE "SERVICE_LICENSE" AS ENUM ('STANDARD', 'PRO');

-- CreateTable
CREATE TABLE "licenses" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "license" "SERVICE_LICENSE" NOT NULL,

    CONSTRAINT "licenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "licenses" ADD CONSTRAINT "licenses_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
