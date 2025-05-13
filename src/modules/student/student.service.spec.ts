import { StudentService } from "./student.service";
import { IStudentRepostiry } from "./student.interface";
import { UpdateStudentDto } from "./student.dto";

describe("StudentService", () => {
  let studentService: StudentService;
  let mockStudentRepository: jest.Mocked<IStudentRepostiry>;

  const createMockStudent = (overrides: Partial<any> = {}) => ({
    id: "mock-id",
    name: "Mock Name",
    lastName: "Mock LastName",
    email: "mock@email.com",
    password: "mocked-password",
    ...overrides,
  });

  beforeEach(() => {
    mockStudentRepository = {
      selectStudentById: jest.fn(),
      findStudentByEmail: jest.fn(),
      updateStudentProfile: jest.fn(),
    };
    studentService = new StudentService(mockStudentRepository);
  });

  describe("selectStudentById", () => {
    it("deve retornar um estudante pelo ID", async () => {
      const studentId = "123";
      const mockStudent = createMockStudent({ id: studentId });

      mockStudentRepository.selectStudentById.mockResolvedValue(mockStudent);

      const result = await studentService.selectStudentById(studentId);
      expect(mockStudentRepository.selectStudentById).toHaveBeenCalledWith(
        studentId
      );
      expect(result).toEqual(mockStudent);
    });
  });

  describe("updateStudentProfile", () => {
    it("deve atualizar o perfil se o email não for usado por outro estudante", async () => {
      const studentId = "123";
      const dto: UpdateStudentDto = {
        name: "Maria",
        lastName: "Nova",
        email: "maria@email.com",
      };

      mockStudentRepository.findStudentByEmail.mockResolvedValue(
        createMockStudent({ id: studentId, email: dto.email })
      );

      mockStudentRepository.updateStudentProfile.mockResolvedValue(
        createMockStudent({ id: studentId, ...dto })
      );

      const result = await studentService.updateStudentProfile(dto, studentId);

      expect(mockStudentRepository.findStudentByEmail).toHaveBeenCalledWith(
        dto.email
      );
      expect(mockStudentRepository.updateStudentProfile).toHaveBeenCalledWith(
        dto,
        studentId
      );
      expect(result).toEqual(
        expect.objectContaining({ id: studentId, ...dto })
      );
    });

    it("deve lançar erro se o email já estiver em uso por outro estudante", async () => {
      const studentId = "123";
      const dto: UpdateStudentDto = {
        name: "Maria",
        lastName: "Nova",
        email: "usado@email.com",
      };

      mockStudentRepository.findStudentByEmail.mockResolvedValue(
        createMockStudent({ id: "999", email: dto.email })
      );

      await expect(
        studentService.updateStudentProfile(dto, studentId)
      ).rejects.toThrow("Este email já está em uso por outro estudante");
    });

    it("deve atualizar normalmente se email não for informado", async () => {
      const studentId = "123";
      const dto: UpdateStudentDto = {
        name: "Maria",
        lastName: "Atualizado",
        // email ausente
      };

      mockStudentRepository.updateStudentProfile.mockResolvedValue(
        createMockStudent({ id: studentId, ...dto })
      );

      const result = await studentService.updateStudentProfile(dto, studentId);

      expect(mockStudentRepository.findStudentByEmail).not.toHaveBeenCalled();
      expect(mockStudentRepository.updateStudentProfile).toHaveBeenCalledWith(
        dto,
        studentId
      );
      expect(result).toEqual(
        expect.objectContaining({ id: studentId, ...dto })
      );
    });
  });
});
