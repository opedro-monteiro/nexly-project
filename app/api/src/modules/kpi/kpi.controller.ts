import type { FastifyReply, FastifyRequest } from "fastify";
import { getKpis } from "./kpi.service";

export async function getKpisController(_: FastifyRequest, res: FastifyReply) {
  const kpis = await getKpis();
  return res.send(kpis);
}
