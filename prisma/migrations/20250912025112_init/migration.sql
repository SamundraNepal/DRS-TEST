/*
  Warnings:

  - You are about to drop the column `Doctors` on the `Doctors` table. All the data in the column will be lost.
  - You are about to drop the `Diseases` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `doctor_expEn` to the `Doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctor_expNe` to the `Doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctor_imageURL` to the `Doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctor_nameEn` to the `Doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctor_nameNe` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DrsUser"."Doctors" DROP COLUMN "Doctors",
ADD COLUMN     "doctor_expEn" TEXT NOT NULL,
ADD COLUMN     "doctor_expNe" TEXT NOT NULL,
ADD COLUMN     "doctor_imageURL" TEXT NOT NULL,
ADD COLUMN     "doctor_nameEn" TEXT NOT NULL,
ADD COLUMN     "doctor_nameNe" TEXT NOT NULL;

-- DropTable
DROP TABLE "DrsUser"."Diseases";

-- CreateTable
CREATE TABLE "DrsUser"."Disease" (
    "id" SERIAL NOT NULL,
    "disease_image" TEXT,
    "disease_name" JSONB NOT NULL,
    "disease_conditions" JSONB NOT NULL,
    "disease_treatments" JSONB NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);
