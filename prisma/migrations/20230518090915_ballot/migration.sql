-- CreateTable
CREATE TABLE "ballot" (
    "id" SERIAL NOT NULL,
    "il_adi" TEXT,
    "ilce_adi" TEXT,
    "muhtarlik_adi" TEXT,
    "sandik_alani_adi" TEXT,
    "sandik_no" INTEGER NOT NULL,
    "secmen_sayisi" INTEGER NOT NULL,
    "aday1" INTEGER NOT NULL,
    "aday2" INTEGER NOT NULL,
    "aday3" INTEGER NOT NULL,
    "aday4" INTEGER NOT NULL,

    CONSTRAINT "ballot_pkey" PRIMARY KEY ("id")
);
