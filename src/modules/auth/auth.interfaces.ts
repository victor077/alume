import { Prisma, Student } from "@prisma/client";
import {
  LoginDto,
  RegisterDto,
  ResponseLoginDto,
  ResponseRegisterDto,
} from "./auth.dto";

export interface IAuthRepository {
  createStudent(data: Prisma.StudentCreateInput): Promise<Student>;
  findStudentByEmail(email: string): Promise<Student | null>;
}

export interface IAuthService {
  registerStudent(data: RegisterDto): Promise<ResponseRegisterDto>;
  loginStudent(data: LoginDto): Promise<ResponseLoginDto>;
}
