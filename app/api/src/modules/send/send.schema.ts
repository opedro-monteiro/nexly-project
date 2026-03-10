import { z } from 'zod'
import { SendStatus } from '../../enums'

export const sendSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  campaignId: z.string(),
  status: z.nativeEnum(SendStatus),
  sentAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Send = z.infer<typeof sendSchema>

export const createSendSchema = z.object({
  clientId: z.string().min(1, 'clientId é obrigatório'),
  campaignId: z.string().min(1, 'campaignId é obrigatório'),
})
export type CreateSendInput = z.infer<typeof createSendSchema>

export const updateSendSchema = z.object({
  status: z.nativeEnum(SendStatus).optional(),
  sentAt: z.coerce.date().optional(),
})
export type UpdateSendInput = z.infer<typeof updateSendSchema>
