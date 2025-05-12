import fastify, { FastifyInstance } from "fastify";
import { IAuthRepository, IAuthService } from "./auth.interfaces";
import { LoginDto, RegisterDto } from "./dtos/auth.dto";
import bcrypt from "bcrypt";

export class AuthService implements IAuthService {
  constructor(private readonly authRepository: IAuthRepository) {}

  async registerStudent(data: RegisterDto) {
    const { email, password, name, lastName } = data;
    const studentExist = await this.authRepository.findStudentByEmail(email);

    if (studentExist) {
      throw new Error("Esse email já está cadastrado");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const student = await this.authRepository.createStudent({
      name,
      email,
      lastName,
      password: hashedPassword,
    });
    return {
      name: student.name,
      email: student.email,
    };
  }

  async loginStudent(data: LoginDto) {
    console.log("data", data);
    const student = await this.authRepository.findStudentByEmail(data.email);
    console.log("student", student);
    if (!student) throw new Error("Esse email não existe");
    const isValid = await bcrypt.compare(data.password, student.password);
    if (!isValid) throw new Error("Credenciais inválidas");
    return {
      id: student?.id ?? "",
      name: student?.name ?? "",
      email: student?.email ?? "",
    };
  }
}
