import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

export const prisma = new PrismaClient();

const prismaPlugin = fastifyPlugin(
  async (fastify: FastifyInstance) => {
    try {
      await prisma.$connect();
      fastify.log.info("Prisma conectado com sucesso");
    } catch (error) {
      fastify.log.error("Erro ao conectar o Prisma", error);
    }
    fastify.addHook("onClose", async () => {
      await prisma.$disconnect();
      fastify.log.info("Prisma desconectado com sucesso");
    });
  },
  { name: "prisma", dependencies: ["config"] }
);

export default prismaPlugin;
