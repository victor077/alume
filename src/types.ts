import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export interface FastifyInstanceToken extends FastifyInstance {
  signToken(payload: object): string;
  authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
}

export interface FastifyRequestStudent extends FastifyRequest {
  user: {
    id: string;
    email: string;
  };
}
