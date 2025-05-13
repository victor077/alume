import { RegisterFinanceDto, StudentFinancingDto } from "./finance.dto";
import { IFinanceRepository, IFinanceService } from "./finance.interface";
import { Finance } from "./finance.domain";

export class FinanceService implements IFinanceService {
  constructor(private readonly financeRepository: IFinanceRepository) {}

  async createFinance(
    idStudent: string,
    data: RegisterFinanceDto
  ): Promise<number> {
    const { maxInstallments, totalValue } = data;
    const finance = new Finance(maxInstallments, totalValue);
    const installment = finance.getInstallment();
    await this.financeRepository.createFinance(idStudent, {
      maxInstallments,
      fessMonth: Finance.fessMonthPercentage,
      totalValue,
      valueInstallments: installment,
    });
    return installment;
  }

  async selectAllFinance(idStudent: string): Promise<StudentFinancingDto[]> {
    const finance = await this.financeRepository.selectAllFinance(idStudent);
    const result = finance.map((value) => {
      const formateResult = {
        totalValue: value.totalValue,
        maxInstallments: value.maxInstallments,
        id: value.id,
      };
      return formateResult;
    });

    return result;
  }
}
