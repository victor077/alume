import { z } from "zod";

export const studentSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export type ResponseStudentDto = z.infer<typeof studentSchema>;

export const updateStudentSchema = z.object({
  name: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  email: z.string().email().optional(),
});

export type UpdateStudentDto = z.infer<typeof updateStudentSchema>;
