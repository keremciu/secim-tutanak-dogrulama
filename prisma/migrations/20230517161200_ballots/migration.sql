-- CreateTable
CREATE TABLE "Ballot" (
    "id" TEXT NOT NULL,
    "il_adi" TEXT NOT NULL,
    "ilce_adi" TEXT NOT NULL,
    "muhtarlik_adi" TEXT NOT NULL,
    "sandik_alani_adi" TEXT NOT NULL,
    "sandik_no" INTEGER NOT NULL,
    "secmen_sayisi" INTEGER NOT NULL,
    "aday1" INTEGER NOT NULL,
    "aday2" INTEGER NOT NULL,
    "aday3" INTEGER NOT NULL,
    "aday4" INTEGER NOT NULL,

    CONSTRAINT "Ballot_pkey" PRIMARY KEY ("id")
);
