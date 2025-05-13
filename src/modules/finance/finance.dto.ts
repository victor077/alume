import { z } from "zod";

export const registerFinanceSchema = z.object({
  totalValue: z.number().min(100),
  maxInstallments: z.number().min(2),
});

export type RegisterFinanceDto = z.infer<typeof registerFinanceSchema>;

export const responseFinanceSchema = z.object({
  id: z.string(),
  totalValue: z.number(),
  maxInstallments: z.number(),
});

export type StudentFinancingDto = z.infer<typeof responseFinanceSchema>;
