import { FastifyReply } from "fastify";
import { IAuthService } from "./auth.interfaces";
import { LoginDto, loginSchema, RegisterDto, registerSchema } from "./auth.dto";
import { FastifyInstanceToken } from "types";

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  async registerStudent(data: RegisterDto, reply: FastifyReply) {
    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      return reply.status(400).send({
        status: "error",
        message: "Erro na validação dos parametros",
        error: parsed.error.format(),
      });
    }
    try {
      const student = await this.authService.registerStudent(parsed.data);
      return reply.status(201).send({
        status: "success",
        data: student,
      });
    } catch (error: any) {
      return reply.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  }

  async loginStudent(
    data: LoginDto,
    reply: FastifyReply,
    app: FastifyInstanceToken
  ) {
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      return reply.status(400).send({
        status: "error",
        message: "Erro na validação dos parametros",
        eroors: parsed.error.format(),
      });
    }
    try {
      const student = await this.authService.loginStudent(parsed.data);
      const token = app.signToken({ sub: student.id, email: student.email });
      return reply.status(201).send({
        status: "sucess",
        data: student,
        token,
      });
    } catch (error: any) {
      return reply.status(401).send({
        status: "error",
        message: error?.message,
      });
    }
  }
}
