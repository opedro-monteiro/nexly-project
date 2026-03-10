import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./env.js";
import { routes } from "./routes/index.js";

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: ["*"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Fastify API - Nexly API",
      description: "API for Nexly API Challenge",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3333",
        description: "Local",
      },
    ],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(routes);

const startServer = async () => {
  try {
    await app.listen({ port: env.PORT });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();
