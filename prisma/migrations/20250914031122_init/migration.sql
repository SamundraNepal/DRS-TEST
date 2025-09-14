/*
  Warnings:

  - Added the required column `doctor_email` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DrsUser"."Doctors" ADD COLUMN     "doctor_email" TEXT NOT NULL;
