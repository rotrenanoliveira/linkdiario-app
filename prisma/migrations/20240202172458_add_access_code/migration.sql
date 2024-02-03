-- CreateTable
CREATE TABLE "access_code" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "access_code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "access_code_code_key" ON "access_code"("code");

-- AddForeignKey
ALTER TABLE "access_code" ADD CONSTRAINT "access_code_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
