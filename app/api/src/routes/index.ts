import { campaignRoutes } from "../modules/campain/campaign.routes";
import { clientRoutes } from "../modules/client/client.routes";
import { sendRoutes } from "../modules/send/send.routes";
import type { FastifyTypedInstance } from "../types";

export async function routes(app: FastifyTypedInstance) {
  app.register(campaignRoutes, { prefix: "/api/v1" });
  app.register(clientRoutes, { prefix: "/api/v1" });
  app.register(sendRoutes, { prefix: "/api/v1" });
}
