import { StudentController } from "./student.controller";
import { StudentRepository } from "./student.repository";
import { StudentService } from "./student.service";

const repository = new StudentRepository();
const service = new StudentService(repository);
const controller = new StudentController(service);

export { controller };
