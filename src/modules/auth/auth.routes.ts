import { FastifyInstance, FastifyRequest } from "fastify";
import { LoginDto, RegisterDto } from "./auth.dto";

import { FastifyInstanceToken } from "types";
import { loginSwaggerSchema, registerSwaggerSchema } from "./auth.schema";
import { controller } from ".";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    "register",
    { schema: registerSwaggerSchema },
    async (request: FastifyRequest<{ Body: RegisterDto }>, reply) => {
      return await controller.registerStudent(request.body, reply);
    }
  );
  fastify.post(
    "login",
    { schema: loginSwaggerSchema },
    async (request: FastifyRequest<{ Body: LoginDto }>, reply) => {
      return await controller.loginStudent(
        request.body,
        reply,
        fastify as FastifyInstanceToken
      );
    }
  );
}
