import { Prisma, StudentFinancing } from "@prisma/client";
import { IFinanceRepository } from "./finance.interface";
import { prisma } from "@prisma";

export class FinanceRepository implements IFinanceRepository {
  async createFinance(
    data: Prisma.StudentFinancingCreateInput
  ): Promise<StudentFinancing> {
    return await prisma.studentFinancing.create({ data });
  }
}
