import fromZodSchema from "zod-to-json-schema";
import { loginSchema, registerSchema } from "../dtos/auth.dto";

const registerBodySchema = fromZodSchema(registerSchema);
const loginBodySchema = fromZodSchema(loginSchema);

export const registerSwaggerSchema = {
  body: registerBodySchema,
  response: {
    201: {
      description: "Estudante criado com sucesso",
      type: "object",
      properties: {
        status: { type: "string" },
        data: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            email: { type: "string" },
          },
        },
      },
    },
    400: {
      description: "Erro de validação ou de regra de negócio",
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
      },
    },
    500: {
      description: "Erro interno inesperado",
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
      },
    },
  },
  tags: ["Auth"],
  summary: "Registro de estudante",
  description: "Criar um novo estudante com nome, sobrenome, email e senha",
};

export const loginSwaggerSchema = {
  body: loginBodySchema,
  response: {
    201: {
      description: "Login feito com sucesso",
      type: "object",
      properties: {
        status: { type: "string" },
        data: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
          },
        },
        token: { type: "string" },
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
    401: {
      description: "Credenciais inválidas",
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
      },
    },
    500: {
      description: "Erro interno inesperado",
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
      },
    },
  },
  tags: ["Auth"],
  summary: "Login do estudante",
  description: "Autentica o estudante e retorna um token",
};
