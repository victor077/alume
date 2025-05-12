import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { StudentRepository } from "./student.repository";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";
import { schemaEstudent, schemaUpdateStudent } from "./schemas/student.schema";
import { FastifyInstanceToken } from "types";
import { updateStudentSchema } from "./dtos/student.dto";

const repository = new StudentRepository();
const service = new StudentService(repository);
const controller = new StudentController(service);
export async function studentRoutes(fastify: FastifyInstance) {
  const app = fastify as FastifyInstanceToken;
  fastify.get(
    "me",
    {
      schema: schemaEstudent,
      onRequest: [app.authenticate],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.user as { id: string };
      return controller.getStudentById(id, reply);
    }
  );

  fastify.put(
    "me",
    {
      schema: schemaUpdateStudent,
      onRequest: [app.authenticate],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.user as { id: string };
      const parsed = updateStudentSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          status: "error",
          message: "Erro de validação",
        });
      }
      return controller.updateStudentProfile(id, parsed.data, reply);
    }
  );
}
