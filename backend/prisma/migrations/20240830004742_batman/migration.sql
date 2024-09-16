-- CreateTable
CREATE TABLE "Organization" (
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Donor" (
    "address" TEXT NOT NULL,
    "totalDonated" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizationName" TEXT NOT NULL,
    "donorAddress" TEXT NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Withdrawal" (
    "id" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "purpose" TEXT NOT NULL DEFAULT '',
    "organizationName" TEXT NOT NULL,

    CONSTRAINT "Withdrawal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_address_key" ON "Donor"("address");

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_organizationName_fkey" FOREIGN KEY ("organizationName") REFERENCES "Organization"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donorAddress_fkey" FOREIGN KEY ("donorAddress") REFERENCES "Donor"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Withdrawal" ADD CONSTRAINT "Withdrawal_organizationName_fkey" FOREIGN KEY ("organizationName") REFERENCES "Organization"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
