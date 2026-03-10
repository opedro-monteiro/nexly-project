import { z } from "zod";
import { commonResponseSchema } from "../../schemas/common.response.schema";
import { idParamSchema } from "../../schemas/common.schema";
import type { FastifyTypedInstance } from "../../types";
import {
  createClientController,
  deleteClientController,
  getClientByIdController,
  listClientsController,
  listTagSummariesController,
  updateClientController,
} from "./client.controller";
import {
  clientSchema,
  createClientSchema,
  tagSummarySchema,
  updateClientSchema,
} from "./client.schema";

export async function clientRoutes(app: FastifyTypedInstance) {
  app.post(
    "/clients",
    {
      schema: {
        body: createClientSchema,
        tags: ["clients"],
        response: {
          201: clientSchema,
          ...commonResponseSchema,
        },
      },
    },
    createClientController,
  );

  app.get(
    "/clients",
    {
      schema: {
        tags: ["clients"],
        response: {
          200: z.array(clientSchema),
          ...commonResponseSchema,
        },
      },
    },
    listClientsController,
  );

  app.get(
    "/clients/tags",
    {
      schema: {
        tags: ["clients"],
        response: {
          200: z.array(tagSummarySchema),
          ...commonResponseSchema,
        },
      },
    },
    listTagSummariesController,
  );

  app.get(
    "/clients/:id",
    {
      schema: {
        params: idParamSchema,
        tags: ["clients"],
        response: {
          200: clientSchema,
          ...commonResponseSchema,
        },
      },
    },
    getClientByIdController,
  );

  app.put(
    "/clients/:id",
    {
      schema: {
        params: idParamSchema,
        body: updateClientSchema,
        tags: ["clients"],
        response: {
          200: clientSchema,
          ...commonResponseSchema,
        },
      },
    },
    updateClientController,
  );

  app.delete(
    "/clients/:id",
    {
      schema: {
        params: idParamSchema,
        tags: ["clients"],
        response: {
          200: z.object({ message: z.string() }),
          ...commonResponseSchema,
        },
      },
    },
    deleteClientController,
  );
}
