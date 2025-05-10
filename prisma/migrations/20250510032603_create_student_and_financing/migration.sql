-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentFinancing" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "maxInstallments" INTEGER NOT NULL,
    "fessMonth" DOUBLE PRECISION NOT NULL,
    "valueInstallments" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "StudentFinancing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "StudentFinancing" ADD CONSTRAINT "StudentFinancing_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
