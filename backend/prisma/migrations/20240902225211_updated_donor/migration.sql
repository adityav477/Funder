/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "totalDonated" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_address_key" ON "Organization"("address");
