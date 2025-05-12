import { Prisma, StudentFinancing } from "@prisma/client";
import { RegisterFinanceDto, StudentFinancingDto } from "./finance.dto";

export interface IFinanceRepository {
  createFinance(
    idStudent: string,
    data: Omit<Prisma.StudentFinancingCreateInput, "student">
  ): Promise<StudentFinancing>;
  selectAllFinance(idStudent: string): Promise<StudentFinancing[]>;
}

export interface IFinanceService {
  createFinance(idStudent: string, data: RegisterFinanceDto): Promise<number>;
  selectAllFinance(idStudent: string): Promise<StudentFinancingDto[]>;
}
