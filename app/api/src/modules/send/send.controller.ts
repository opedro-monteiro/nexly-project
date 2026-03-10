import type { FastifyReply, FastifyRequest } from 'fastify'
import { idParamSchema } from '../../schemas/common.schema'
import { createSendSchema, updateSendSchema } from './send.schema'
import {
  createSend,
  deleteSend,
  getSendById,
  listSends,
  updateSend,
} from './send.service'

export async function createSendController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = createSendSchema.safeParse(req.body)
  if (!parsed.success) {
    return res
      .status(400)
      .send({ message: 'Dados inválidos', issues: parsed.error.format() })
  }

  const item = await createSend(parsed.data)
  return res.status(201).send(item)
}

export async function listSendsController(
  _: FastifyRequest,
  res: FastifyReply
) {
  const items = await listSends()
  return res.send(items)
}

export async function getSendByIdController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)
  if (!parsed.success) return res.status(400).send({ message: 'ID inválido' })

  const { id } = parsed.data
  const item = await getSendById(id)

  if (!item) return res.status(404).send({ message: 'Envio não encontrado' })

  return res.send(item)
}

export async function updateSendController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)
  if (!parsed.success) return res.status(400).send({ message: 'ID inválido' })

  const parsedBody = updateSendSchema.safeParse(req.body)
  if (!parsedBody.success)
    return res
      .status(400)
      .send({ message: 'Dados inválidos', issues: parsedBody.error.format() })

  const item = await updateSend(parsed.data.id, parsedBody.data)
  return res.send(item)
}

export async function deleteSendController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)
  if (!parsed.success) return res.status(400).send({ message: 'ID inválido' })

  await deleteSend(parsed.data.id)
  return res.send({ message: 'Envio deletado com sucesso' })
}
