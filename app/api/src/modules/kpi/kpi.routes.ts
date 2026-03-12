import { commonResponseSchema } from "../../schemas/common.response.schema";
import type { FastifyTypedInstance } from "../../types";
import { getKpisController } from "./kpi.controller";
import { kpiSchema } from "./kpi.schema";

export async function kpiRoutes(app: FastifyTypedInstance) {
  app.get(
    "/kpis",
    {
      schema: {
        tags: ["kpis"],
        response: {
          200: kpiSchema,
          ...commonResponseSchema,
        },
      },
    },
    getKpisController,
  );
}
