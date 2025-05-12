import { Prisma } from "@prisma/client";
import { IAuthRepository } from "./auth.interfaces";
import { prisma } from "@prisma";

export class AuthRepository implements IAuthRepository {
  async createStudent(data: Prisma.StudentCreateInput) {
    return prisma.student.create({
      data,
    });
  }
  async findStudentByEmail(email: string) {
    return prisma.student.findUnique({
      where: {
        email,
      },
    });
  }
}
