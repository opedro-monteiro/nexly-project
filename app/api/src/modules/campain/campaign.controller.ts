import type { FastifyReply, FastifyRequest } from "fastify";
import { idParamSchema } from "../../schemas/common.schema";
import { createCampaignSchema, updateCampaignSchema } from "./campaign.schema";
import {
  createCampaign,
  deleteCampaign,
  dispatchCampaign,
  getCampaignById,
  listCampaigns,
  updateCampaign,
} from "./campaign.service";

export async function createCampaignController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const parsed = createCampaignSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .send({ message: "Dados inválidos", issues: parsed.error });
  }

  const item = await createCampaign(parsed.data);
  return res.status(201).send(item);
}

export async function listCampaignsController(
  _: FastifyRequest,
  res: FastifyReply,
) {
  const items = await listCampaigns();
  return res.send(items);
}

export async function getCampaignByIdController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const parsed = idParamSchema.safeParse(req.params);
  if (!parsed.success) return res.status(400).send({ message: "ID inválido" });

  const { id } = parsed.data;
  const item = await getCampaignById(id);

  if (!item)
    return res.status(404).send({ message: "Campanha não encontrada" });

  return res.send(item);
}

export async function updateCampaignController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const parsed = idParamSchema.safeParse(req.params);
  if (!parsed.success) return res.status(400).send({ message: "ID inválido" });

  const parsedBody = updateCampaignSchema.safeParse(req.body);
  if (!parsedBody.success)
    return res
      .status(400)
      .send({ message: "Dados inválidos", issues: parsedBody.error });

  const item = await updateCampaign(parsed.data.id, parsedBody.data);
  return res.send(item);
}

export async function deleteCampaignController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const parsed = idParamSchema.safeParse(req.params);
  if (!parsed.success) return res.status(400).send({ message: "ID inválido" });

  await deleteCampaign(parsed.data.id);
  return res.send({ message: "Campanha deletada com sucesso" });
}

export async function dispatchCampaignController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const parsed = idParamSchema.safeParse(req.params);
  if (!parsed.success) return res.status(400).send({ message: "ID inválido" });

  try {
    const result = await dispatchCampaign(parsed.data.id);
    return res.status(200).send(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao disparar campanha";
    return res.status(404).send({ message });
  }
}
