import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./auth.dto";

import { FastifyInstanceToken } from "types";
import { loginSwaggerSchema, registerSwaggerSchema } from "./auth.schema";

const repository = new AuthRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    "register",
    { schema: registerSwaggerSchema },
    async (request: FastifyRequest<{ Body: RegisterDto }>, reply) => {
      return await controller.postRegisterStudent(request.body, reply);
    }
  );
  fastify.post(
    "login",
    { schema: loginSwaggerSchema },
    async (request: FastifyRequest<{ Body: LoginDto }>, reply) => {
      return await controller.postLoginStudent(
        request.body,
        reply,
        fastify as FastifyInstanceToken
      );
    }
  );
}
