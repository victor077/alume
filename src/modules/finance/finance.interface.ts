import { Prisma, StudentFinancing } from "@prisma/client";
import { RegisterFinanceDto } from "./finance.dto";

export interface IFinanceRepository {
  createFinance(
    data: Prisma.StudentFinancingCreateInput
  ): Promise<StudentFinancing>;
}

export interface IFinanceService {
  createFinance(data: RegisterFinanceDto): Promise<StudentFinancing>;
}
