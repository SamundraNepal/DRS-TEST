/*
  Warnings:

  - You are about to drop the `Diseases_Doctors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DrsUser"."Diseases_Doctors";

-- CreateTable
CREATE TABLE "DrsUser"."Diseases" (
    "id" SERIAL NOT NULL,
    "CTVS_Diseases_and_Procedures" JSONB NOT NULL,

    CONSTRAINT "Diseases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrsUser"."Doctors" (
    "id" SERIAL NOT NULL,
    "Doctors" JSONB NOT NULL,

    CONSTRAINT "Doctors_pkey" PRIMARY KEY ("id")
);
