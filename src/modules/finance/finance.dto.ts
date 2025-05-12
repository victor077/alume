import { z } from "zod";

export const registerFinanceSchema = z.object({
  name: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterFinanceDto = z.infer<typeof registerFinanceSchema>;
