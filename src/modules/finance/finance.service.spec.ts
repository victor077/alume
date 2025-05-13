import { FinanceService } from "./finance.service";
import { IFinanceRepository } from "./finance.interface";
import { RegisterFinanceDto, StudentFinancingDto } from "./finance.dto";

describe("FinanceService", () => {
  let financeService: FinanceService;
  let mockFinanceRepository: jest.Mocked<IFinanceRepository>;

  beforeEach(() => {
    mockFinanceRepository = {
      createFinance: jest.fn(),
      selectAllFinance: jest.fn(),
    };
    financeService = new FinanceService(mockFinanceRepository);
  });

  describe("createFinance", () => {
    it("deve calcular corretamente a parcela e salvar no repositório", async () => {
      const studentId = "student-1";
      const dto: RegisterFinanceDto = {
        maxInstallments: 12,
        totalValue: 1000,
      };

      const expectedRawPMT =
        dto.totalValue *
        (0.02 / (1 - Math.pow(1 + 0.02, -dto.maxInstallments)));
      const expectedInstallment = Math.floor(expectedRawPMT * 100) / 100;

      const result = await financeService.createFinance(studentId, dto);

      expect(mockFinanceRepository.createFinance).toHaveBeenCalledWith(
        studentId,
        {
          maxInstallments: dto.maxInstallments,
          fessMonth: 0.02,
          totalValue: dto.totalValue,
          valueInstallments: expectedInstallment,
        }
      );

      expect(result).toBe(expectedInstallment);
    });
  });

  describe("selectAllFinance", () => {
    it("deve retornar apenas os campos do DTO após buscar do repositório", async () => {
      const studentId = "student-1";

      const mockFinances = [
        {
          id: "f1",
          totalValue: 1000,
          maxInstallments: 12,
          fessMonth: 0.02,
          valueInstallments: 91.96,
          studentId,
        },
        {
          id: "f2",
          totalValue: 2000,
          maxInstallments: 10,
          fessMonth: 0.02,
          valueInstallments: 224.59,
          studentId,
        },
      ];

      mockFinanceRepository.selectAllFinance.mockResolvedValue(mockFinances);

      const result = await financeService.selectAllFinance(studentId);

      const expected: StudentFinancingDto[] = [
        {
          id: "f1",
          totalValue: 1000,
          maxInstallments: 12,
        },
        {
          id: "f2",
          totalValue: 2000,
          maxInstallments: 10,
        },
      ];

      expect(mockFinanceRepository.selectAllFinance).toHaveBeenCalledWith(
        studentId
      );
      expect(result).toEqual(expected);
    });
  });
});
