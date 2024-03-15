-- CreateTable
CREATE TABLE "campaign-analytics" (
    "id" TEXT NOT NULL,
    "page_view" INTEGER NOT NULL,
    "click_cta" INTEGER NOT NULL,
    "referer" TEXT,
    "platform" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "campaign-analytics_pkey" PRIMARY KEY ("id")
);
