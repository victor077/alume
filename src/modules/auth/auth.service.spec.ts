// auth.service.spec.ts
import { AuthService } from "./auth.service";
import { IAuthRepository } from "./auth.interfaces";
import { RegisterDto, LoginDto } from "./auth.dto";
import bcrypt from "bcrypt";

describe("AuthService", () => {
  let authService: AuthService;
  let mockAuthRepository: jest.Mocked<IAuthRepository>;

  beforeEach(() => {
    mockAuthRepository = {
      findStudentByEmail: jest.fn(),
      createStudent: jest.fn(),
    };
    authService = new AuthService(mockAuthRepository);
  });

  describe("registerStudent", () => {
    it("deve registrar um novo estudante", async () => {
      // arrange
      const dto: RegisterDto = {
        name: "João",
        lastName: "Silva",
        email: "joao@email.com",
        password: "senha123",
      };

      mockAuthRepository.findStudentByEmail.mockResolvedValue(null);
      mockAuthRepository.createStudent.mockImplementation(async (data) => ({
        id: "123",
        ...data,
      }));

      //   act
      const result = await authService.registerStudent(dto);

      //   assert
      expect(mockAuthRepository.findStudentByEmail).toHaveBeenCalledWith(
        dto.email
      );
      expect(mockAuthRepository.createStudent).toHaveBeenCalled();
      expect(result).toEqual({
        name: dto.name,
        email: dto.email,
      });
    });

    it("deve lançar erro se o email já existir", async () => {
      mockAuthRepository.findStudentByEmail.mockResolvedValue({
        id: "1",
        email: "joao@email.com",
        name: "João",
        lastName: "Silva",
        password: "hashed",
      });

      await expect(
        authService.registerStudent({
          name: "João",
          lastName: "Silva",
          email: "joao@email.com",
          password: "senha123",
        })
      ).rejects.toThrow("Esse email já está cadastrado");
    });
  });

  describe("loginStudent", () => {
    it("deve retornar dados do estudante se login for válido", async () => {
      const password = "senha123";
      const hashed = await bcrypt.hash(password, 12);

      const mockStudent = {
        id: "1",
        name: "João",
        lastName: "Silva",
        email: "joao@email.com",
        password: hashed,
      };

      mockAuthRepository.findStudentByEmail.mockResolvedValue(mockStudent);

      const dto: LoginDto = {
        email: mockStudent.email,
        password,
      };

      const result = await authService.loginStudent(dto);

      expect(result).toEqual({
        id: mockStudent.id,
        name: mockStudent.name,
        email: mockStudent.email,
      });
    });

    it("deve lançar erro se o estudante não for encontrado", async () => {
      mockAuthRepository.findStudentByEmail.mockResolvedValue(null);

      await expect(
        authService.loginStudent({
          email: "inexistente@email.com",
          password: "123",
        })
      ).rejects.toThrow("Esse email não existe");
    });

    it("deve lançar erro se a senha for inválida", async () => {
      const mockStudent = {
        id: "1",
        name: "João",
        lastName: "Silva",
        email: "joao@email.com",
        password: await bcrypt.hash("correta", 12),
      };

      mockAuthRepository.findStudentByEmail.mockResolvedValue(mockStudent);

      await expect(
        authService.loginStudent({
          email: mockStudent.email,
          password: "errada",
        })
      ).rejects.toThrow("Credenciais inválidas");
    });
  });
});
