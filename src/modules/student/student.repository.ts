import { Prisma, Student } from "@prisma/client";
import { IStudentRepostiry } from "./student.interface";
import { prisma } from "@prisma";

export class StudentRepository implements IStudentRepostiry {
  async findStudentByEmail(email: string) {
    return prisma.student.findUnique({
      where: { email: email },
    });
  }
  async selectStudentById(id: string) {
    return prisma.student.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
      },
    });
  }

  async updateStudentProfile(data: Prisma.StudentUpdateInput, id: string) {
    return prisma.student.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
      },
    });
  }
}
