import { StudentFinancing } from "@prisma/client";
import { RegisterFinanceDto, StudentFinancingDto } from "./finance.dto";
import { IFinanceRepository, IFinanceService } from "./finance.interface";
import { truncateToTwoDecimals } from "utils";

export class FinanceService implements IFinanceService {
  constructor(private readonly financeRepository: IFinanceRepository) {}

  async createFinance(
    idStudent: string,
    data: RegisterFinanceDto
  ): Promise<number> {
    const { maxInstallments, totalValue } = data;
    const fessMonthPercentage = 0.02;
    const pmt =
      totalValue *
      (fessMonthPercentage /
        (1 - Math.pow(1 + fessMonthPercentage, -maxInstallments)));
    const pmtFormated = truncateToTwoDecimals(pmt);
    await this.financeRepository.createFinance(idStudent, {
      maxInstallments,
      fessMonth: fessMonthPercentage,
      totalValue,
      valueInstallments: pmtFormated,
    });
    return pmtFormated;
  }

  async selectAllFinance(idStudent: string): Promise<StudentFinancingDto[]> {
    const finance = await this.financeRepository.selectAllFinance(idStudent);
    return finance.map((value, index) => ({
      totalValue: value.totalValue,
      maxInstallments: value.maxInstallments,
      id: index,
    }));
  }
}
