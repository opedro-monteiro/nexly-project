import type { FastifyReply, FastifyRequest } from "fastify";
import { idParamSchema } from "../../schemas/common.schema";
import { createClientSchema, updateClientSchema } from "./client.schema";
import {
  createClient,
  deleteClient,
  getClientById,
  listClients,
  listTagSummaries,
  updateClient,
} from "./client.service";

export async function createClientController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const parsed = createClientSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .send({ message: "Dados inválidos", issues: parsed.error });
  }

  const item = await createClient(parsed.data);
  return res.status(201).send(item);
}

export async function listClientsController(
  _: FastifyRequest,
  res: FastifyReply,
) {
  const items = await listClients();
  return res.send(items);
}

export async function getClientByIdController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const parsed = idParamSchema.safeParse(req.params);
  if (!parsed.success) return res.status(400).send({ message: "ID inválido" });

  const { id } = parsed.data;
  const item = await getClientById(id);

  if (!item) return res.status(404).send({ message: "Cliente não encontrado" });

  return res.send(item);
}

export async function updateClientController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const parsed = idParamSchema.safeParse(req.params);
  if (!parsed.success) return res.status(400).send({ message: "ID inválido" });

  const parsedBody = updateClientSchema.safeParse(req.body);
  if (!parsedBody.success)
    return res
      .status(400)
      .send({ message: "Dados inválidos", issues: parsedBody.error });

  const item = await updateClient(parsed.data.id, parsedBody.data);
  return res.send(item);
}

export async function listTagSummariesController(
  _: FastifyRequest,
  res: FastifyReply,
) {
  const tags = await listTagSummaries();
  return res.send(tags);
}

export async function deleteClientController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const parsed = idParamSchema.safeParse(req.params);
  if (!parsed.success) return res.status(400).send({ message: "ID inválido" });

  try {
    await deleteClient(parsed.data.id);
    return res.send({ message: "Cliente deletado com sucesso" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "";
    if (message.includes("RESTRICT") || message.includes("foreign key")) {
      return res.status(409).send({
        message:
          "Não é possível excluir este cliente pois ele possui envios vinculados. Remova os envios antes de excluí-lo.",
      });
    }
    return res.status(500).send({ message: "Erro ao excluir cliente." });
  }
}
