import { z } from "zod";
import { commonResponseSchema } from "../../schemas/common.response.schema";
import { idParamSchema } from "../../schemas/common.schema";
import type { FastifyTypedInstance } from "../../types";
import {
  createCampaignController,
  deleteCampaignController,
  dispatchCampaignController,
  getCampaignByIdController,
  listCampaignsController,
  updateCampaignController,
} from "./campaign.controller";
import {
  campaignSchema,
  createCampaignSchema,
  dispatchResultSchema,
  updateCampaignSchema,
} from "./campaign.schema";

export async function campaignRoutes(app: FastifyTypedInstance) {
  app.post(
    "/campaigns",
    {
      schema: {
        body: createCampaignSchema,
        tags: ["campaigns"],
        response: {
          201: campaignSchema,
          ...commonResponseSchema,
        },
      },
    },
    createCampaignController,
  );

  app.get(
    "/campaigns",
    {
      schema: {
        tags: ["campaigns"],
        response: {
          200: z.array(campaignSchema),
          ...commonResponseSchema,
        },
      },
    },
    listCampaignsController,
  );

  app.get(
    "/campaigns/:id",
    {
      schema: {
        params: idParamSchema,
        tags: ["campaigns"],
        response: {
          200: campaignSchema,
          ...commonResponseSchema,
        },
      },
    },
    getCampaignByIdController,
  );

  app.put(
    "/campaigns/:id",
    {
      schema: {
        params: idParamSchema,
        body: updateCampaignSchema,
        tags: ["campaigns"],
        response: {
          200: campaignSchema,
          ...commonResponseSchema,
        },
      },
    },
    updateCampaignController,
  );

  app.post(
    "/campaigns/:id/dispatch",
    {
      schema: {
        params: idParamSchema,
        tags: ["campaigns"],
        response: {
          200: dispatchResultSchema,
          ...commonResponseSchema,
        },
      },
    },
    dispatchCampaignController,
  );

  app.delete(
    "/campaigns/:id",
    {
      schema: {
        params: idParamSchema,
        tags: ["campaigns"],
        response: {
          200: z.object({ message: z.string() }),
          ...commonResponseSchema,
        },
      },
    },
    deleteCampaignController,
  );
}
