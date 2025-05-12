import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FinanceRepository } from "./finance.repository";
import { FinanceService } from "./finance.service";
import { FinanceController } from "./finance.controller";
import { schemaGetAllFinances, schemaRegisterFinance } from "./finance.schema";
import { FastifyInstanceToken } from "types";
import { RegisterFinanceDto } from "./finance.dto";

const repository = new FinanceRepository();
const service = new FinanceService(repository);
const controller = new FinanceController(service);

export async function financeRoutes(fastify: FastifyInstance) {
  const app = fastify as FastifyInstanceToken;

  fastify.post<{
    Body: RegisterFinanceDto;
  }>("simulations", {
    schema: schemaRegisterFinance,
    onRequest: [app.authenticate],
    handler: async (
      request: FastifyRequest<{ Body: RegisterFinanceDto }>,
      reply: FastifyReply
    ) => {
      const { id } = request.user as { id: string };
      return await controller.postFinance(id, request.body, reply);
    },
  });

  fastify.get(
    "simulations",
    {
      schema: schemaGetAllFinances,
      onRequest: [app.authenticate],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.user as { id: string };
      return controller.getAllFinance(id, reply);
    }
  );
}
