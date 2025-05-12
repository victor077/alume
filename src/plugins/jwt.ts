import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

const jwtPlugin = fastifyPlugin(async (fastify: FastifyInstance) => {
  fastify.decorate("signToken", (payload: object): string => {
    return fastify.jwt.sign(payload, { expiresIn: "30m" });
  });
});

export default jwtPlugin;
