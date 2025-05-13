import { FastifyReply } from "fastify";
import { IStudentService } from "./student.interface";
import { UpdateStudentDto } from "./student.dto";

export class StudentController {
  constructor(private readonly studentService: IStudentService) {}

  async selectStudentById(id: string, reply: FastifyReply) {
    try {
      const student = await this.studentService.selectStudentById(id);
      return reply.status(200).send({
        status: "sucess",
        data: student,
      });
    } catch (error: any) {
      return reply.status(404).send({
        status: "error",
        message: error.message,
      });
    }
  }

  async updateStudentProfile(
    id: string,
    data: UpdateStudentDto,
    reply: FastifyReply
  ) {
    try {
      const student = await this.studentService.updateStudentProfile(data, id);
      return reply.status(200).send({
        status: "sucess",
        data: student,
      });
    } catch (error: any) {
      return reply.status(404).send({
        status: "error",
        message: error.message,
      });
    }
  }
}
