-- CreateTable
CREATE TABLE "DrsUser"."User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "auth_code" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrsUser"."Diseases_Doctors" (
    "id" SERIAL NOT NULL,
    "CTVS_Diseases_and_Procedures" JSONB NOT NULL,
    "Doctors" JSONB NOT NULL,

    CONSTRAINT "Diseases_Doctors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "DrsUser"."User"("email");
