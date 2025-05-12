import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export interface FastifyInstanceToken extends FastifyInstance {
  signToken(payload: object): string;
  authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
}
