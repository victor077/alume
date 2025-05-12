import { Prisma, StudentFinancing } from "@prisma/client";
import { IFinanceRepository } from "./finance.interface";
import { prisma } from "@prisma";

export class FinanceRepository implements IFinanceRepository {
  async createFinance(
    idStudent: string,
    data: Omit<Prisma.StudentFinancingCreateInput, "student">
  ): Promise<StudentFinancing> {
    return await prisma.studentFinancing.create({
      data: {
        ...data,
        student: {
          connect: { id: idStudent },
        },
      },
    });
  }

  async selectAllFinance(idStudent: string): Promise<StudentFinancing[]> {
    return prisma.studentFinancing.findMany({
      where: { studentId: idStudent },
      select: {
        id: true,
        totalValue: true,
        maxInstallments: true,
        fessMonth: true,
        valueInstallments: true,
        studentId: true,
      },
    });
  }
}
