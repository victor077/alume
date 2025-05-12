import { z } from "zod";

export interface ResponseRegisterDto {
  name: string;
  email: string;
}

export interface ResponseLoginDto {
  id: string;
  name: string;
  email: string;
}

export const registerSchema = z.object({
  name: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginDto = z.infer<typeof loginSchema>;
