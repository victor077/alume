import { registerFinanceSchema } from "./finance.dto";
import fromZodSchema from "zod-to-json-schema";
const registerBodySchema = fromZodSchema(registerFinanceSchema);

export const schemaRegisterFinance = {
  body: registerBodySchema,
  response: {
    201: {
      description: "Financiamento criado com sucesso",
      type: "object",
      properties: {
        status: { type: "string" },
        data: {
          type: "object",
          properties: {
            valueInstallments: {
              type: "number",
              example: 94.12,
            },
          },
        },
      },
    },
    400: {
      description: "Erro de validação",
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
      },
    },
  },
  tags: ["Finance"],
  summary: "Simular e registrar financiamento",
  description:
    "Calcula o valor da parcela mensal de um financiamento e registra no banco",
  security: [{ bearerAuth: [] }],
};

export const schemaGetAllFinances = {
  response: {
    200: {
      description: "Lista de financiamentos do estudante",
      type: "object",
      properties: {
        status: { type: "string", example: "sucess" },
        data: {
          type: "object",
          properties: {
            finances: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number", example: 0 },
                  totalValue: { type: "number", example: 10000 },
                  maxInstallments: { type: "number", example: 12 },
                },
              },
            },
          },
        },
      },
    },
    404: {
      description: "Financiamentos não encontrados",
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
      },
    },
  },
  tags: ["Finance"],
  summary: "Listar financiamentos do estudante",
  description:
    "Retorna todas as simulações de financiamento feitas pelo estudante autenticado",
  security: [{ bearerAuth: [] }],
};
