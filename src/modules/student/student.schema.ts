export const schemaEstudent = {
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      description: "Informações do estudante",
      type: "object",
      properties: {
        status: { type: "string" },
        data: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string", format: "email" },
          },
        },
      },
    },
    401: {
      description: "Token inválido ou ausente",
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
      },
    },
  },
  tags: ["Student"],
  summary: "Buscar estudante autenticado",
  description:
    "Retorna os dados do estudante autenticado com base no token JWT",
};

export const schemaUpdateStudent = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string", format: "email" },
    },
    required: [],
    additionalProperties: false,
  },
  response: {
    200: {
      description: "Estudante atualizado com sucesso",
      type: "object",
      properties: {
        status: { type: "string" },
        data: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string", format: "email" },
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
    404: {
      description: "Estudante não encontrado ou email duplicado",
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
      },
    },
  },
  tags: ["Student"],
  summary: "Atualizar perfil do estudante",
  description:
    "Permite que um estudante autenticado atualize seus próprios dados de forma parcial",
  security: [{ bearerAuth: [] }],
};
