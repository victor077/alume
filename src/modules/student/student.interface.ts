import { Prisma, Student } from "@prisma/client";
import { ResponseStudentDto, UpdateStudentDto } from "./student.dto";

export interface IStudentRepostiry {
  selectStudentById(id: string): Promise<Omit<Student, "password">>;
  updateStudentProfile(
    data: Prisma.StudentUpdateInput,
    id: string
  ): Promise<Omit<Student, "password">>;
  findStudentByEmail(email: string): Promise<Student | null>;
}

export interface IStudentService {
  selectStudentById(id: string): Promise<ResponseStudentDto>;
  updateStudentProfile(
    data: UpdateStudentDto,
    id: string
  ): Promise<ResponseStudentDto>;
}
