-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('ACCION', 'COMEDIA', 'ROMANCE', 'TERROR', 'DRAMA', 'HORROR', 'SUSPENSO', 'INFANTIL', 'TODO');

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "genre" "Genre" NOT NULL,
    "director" TEXT NOT NULL,
    "mainActors" TEXT[],
    "duration" TEXT NOT NULL,
    "rentPrice" DOUBLE PRECISION NOT NULL,
    "salePrice" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "qualification" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
