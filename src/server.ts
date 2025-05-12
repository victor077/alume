import Fastify from "fastify";
import "dotenv/config";
import configPlugin from "./plugins/config";
import prismaPlugin from "./plugins/prisma";
import swaggerPlugin from "./plugins/swagger";
import { authRoutes } from "./modules/auth/auth.routes";
import authenticatePlugin from "plugins/authenticate";
import jwtPlugin from "plugins/jwt";
import { studentRoutes } from "modules/student/student.routes";

const app = Fastify({
  logger: true,
});

app.register(configPlugin);
app.register(swaggerPlugin, {
  dependencies: ["config"],
});
app.register(prismaPlugin, { dependencies: ["config"] });
app.register(jwtPlugin);
app.register(authenticatePlugin);
app.register(authRoutes, { prefix: "api/" });
app.register(studentRoutes, { prefix: "api/" });
app.get("/", async (request, reply) => {
  return { message: "API is running ", db: app.config.DATABASE_URL };
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});
