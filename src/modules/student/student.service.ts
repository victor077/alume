import { UpdateStudentDto } from "./dtos/student.dto";
import { IStudentRepostiry, IStudentService } from "./student.interface";

export class StudentService implements IStudentService {
  constructor(private readonly studentRepository: IStudentRepostiry) {}
  async selectStudentById(id: string) {
    const student = await this.studentRepository.selectStudentById(id);
    return student;
  }
  async updateStudentProfile(data: UpdateStudentDto, id: string) {
    const { email } = data;
    if (email) {
      const existing = await this.studentRepository.findStudentByEmail(email);
      if (existing && existing.id !== id) {
        throw new Error("Este email já está em uso por outro estudante");
      }
    }
    return await this.studentRepository.updateStudentProfile(data, id);
  }
}
