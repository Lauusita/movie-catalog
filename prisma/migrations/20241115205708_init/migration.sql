/*
  Warnings:

  - You are about to alter the column `qualification` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "qualification" SET DATA TYPE DOUBLE PRECISION;
