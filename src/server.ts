import Fastify from "fastify";
import "dotenv/config";
import configPlugin from "./plugins/config";
import prismaPlugin from "./plugins/prisma";
import swaggerPlugin from "./plugins/swagger";

const app = Fastify({
  logger: true,
});

app.register(configPlugin);
app.register(swaggerPlugin, {
  dependencies: ["config"],
});
app.register(prismaPlugin, { dependencies: ["config"] });

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
