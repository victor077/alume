import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FinanceRepository } from "./finance.repository";
import { FinanceService } from "./finance.service";
import { FinanceController } from "./finance.controller";
import { schemaGetAllFinances, schemaRegisterFinance } from "./finance.schema";
import { FastifyInstanceToken, TokenID } from "types";
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
      const { sub } = (await request.jwtDecode()) as TokenID;
      return await controller.createFinance(sub, request.body, reply);
    },
  });

  fastify.get(
    "simulations",
    {
      schema: schemaGetAllFinances,
      onRequest: [app.authenticate],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { sub } = (await request.jwtDecode()) as TokenID;
      return controller.sellectAllFinance(sub, reply);
    }
  );
}
