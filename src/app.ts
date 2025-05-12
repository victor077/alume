import prismaPlugin from "@prisma";
import Fastify from "fastify";
import { authRoutes } from "modules/auth/auth.routes";
import { financeRoutes } from "modules/finance/finance.routes";
import { studentRoutes } from "modules/student/student.routes";
import authenticatePlugin from "plugins/authenticate";
import configPlugin from "plugins/config";
import jwtPlugin from "plugins/jwt";
import swaggerPlugin from "plugins/swagger";

function appBuild() {
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
  app.register(financeRoutes, { prefix: "api/" });

  return app;
}

export default appBuild;
