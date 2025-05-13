import { FastifyReply } from "fastify";
import { RegisterFinanceDto, registerFinanceSchema } from "./finance.dto";
import { IFinanceService } from "./finance.interface";

export class FinanceController {
  constructor(private readonly financeService: IFinanceService) {}

  async createFinance(
    idStudent: string,
    data: RegisterFinanceDto,
    reply: FastifyReply
  ) {
    const parsed = registerFinanceSchema.safeParse(data);
    if (!parsed.success) {
      return reply.status(400).send({
        status: "error",
        message: "Erro na validação dos parametros",
        eroors: parsed.error.format(),
      });
    }
    try {
      const finance: number = await this.financeService.createFinance(
        idStudent,
        parsed.data
      );
      return reply.status(201).send({
        status: "success",
        data: {
          valueInstallments: finance,
        },
      });
    } catch (error: any) {
      return reply.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  }

  async sellectAllFinance(idStudent: string, reply: FastifyReply) {
    try {
      const finance = await this.financeService.selectAllFinance(idStudent);
      return reply.status(200).send({
        status: "sucess",
        data: {
          finances: finance,
        },
      });
    } catch (error: any) {
      return reply.status(404).send({
        status: "error",
        message: error.message,
      });
    }
  }
}
