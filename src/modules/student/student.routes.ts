import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { schemaEstudent, schemaUpdateStudent } from "./student.schema";
import { FastifyInstanceToken, TokenID } from "types";
import { updateStudentSchema } from "./student.dto";
import { controller } from ".";

export async function studentRoutes(fastify: FastifyInstance) {
  const app = fastify as FastifyInstanceToken;
  fastify.get(
    "me",
    {
      schema: schemaEstudent,
      onRequest: [app.authenticate],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { sub } = (await request.jwtDecode()) as TokenID;
      return controller.selectStudentById(sub, reply);
    }
  );

  fastify.put(
    "me",
    {
      schema: schemaUpdateStudent,
      onRequest: [app.authenticate],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { sub } = (await request.jwtDecode()) as TokenID;
      const parsed = updateStudentSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          status: "error",
          message: "Erro de validação",
        });
      }
      return controller.updateStudentProfile(sub, parsed.data, reply);
    }
  );
}
